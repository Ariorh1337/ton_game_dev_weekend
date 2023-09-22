import { makeFastGradient, makeGradient } from "../util/extra";

export default class GameText extends Phaser.GameObjects.Text {
    public on_state_update?: (data: any) => void;

    private _widthLimit: number = 0;
    private _heightLimit: number = 0;
    private _widthLimitScale: number = 1;
    private _heightLimitScale: number = 1;
    private _originalScaleX: number = 1;
    private _originalScaleY: number = 1;

    constructor(
        scene: Phaser.Scene,
        x = 0,
        y = 0,
        text: string | string[] = "",
        style: Phaser.Types.GameObjects.Text.TextStyle = {}
    ) {
        super(scene, x, y, text, style);

        scene.add.existing(this);
    }

    public setWidthLimit(width: number) {
        this._widthLimit = width;
        this.updateWidthLimit();
        return this;
    }

    public setHeightLimit(height: number) {
        this._heightLimit = height;
        this.updateHeightLimit();
        return this;
    }

    public override setText(value: string | string[]) {
        super.setText(value);

        if (this._widthLimit) this.updateWidthLimit();
        if (this._heightLimit) this.updateHeightLimit();

        return this;
    }

    public override setScale(x: number, y?: number) {
        this._originalScaleX = x;
        this._originalScaleY = y === undefined ? x : y;

        this.updateWidthLimit();

        return this;
    }

    public makeFastGradient(color1: string, color2: string) {
        makeFastGradient(this, color1, color2);
        return this;
    }

    public makeGradient(options: Array<{ color: string; percent: number }>) {
        makeGradient(this, options);
        return this;
    }

    private updateWidthLimit() {
        const realWidth = this.width * this._originalScaleX;

        const offset = this._widthLimit / realWidth;

        if (offset > 1) {
            super.setScale(this._originalScaleX, this._originalScaleY);
            return this;
        }

        this._widthLimitScale = Math.min(offset, 1) * this._originalScaleX;

        const limiters = [this._originalScaleX, this._widthLimitScale];

        if (this._heightLimitScale !== 1) {
            limiters.push(this._heightLimitScale);
        }

        super.setScale(Math.min(...limiters));

        return this;
    }

    private updateHeightLimit() {
        const realHeight = this.height * this._originalScaleY;

        const offset = this._heightLimit / realHeight;

        if (offset > 1) {
            super.setScale(this._originalScaleX, this._originalScaleY);
            return this;
        }

        this._heightLimitScale = Math.min(offset, 1) * this._originalScaleY;

        const limiters = [this._originalScaleY, this._heightLimitScale];

        if (this._widthLimitScale !== 1) {
            limiters.push(this._widthLimitScale);
        }

        super.setScale(Math.min(...limiters));

        return this;
    }
}
