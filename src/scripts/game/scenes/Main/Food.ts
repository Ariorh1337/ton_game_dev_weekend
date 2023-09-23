import Main from "../Main";

export default class Food {
    private _scene: Main;
    private _body: MatterJS.BodyType;
    private _circle: Phaser.GameObjects.Arc;

    private _x: number;
    private _y: number;

    constructor(scene: Main) {
        this._scene = scene;

        const { x, y } = scene.getFoodPosition();

        this._x = x;
        this._y = y;

        this._body = scene.matter.add.circle(x, y, 16, {
            label: "Food",
        });

        this._circle = scene.add.circle(x, y, 16, 0xa0a0a0, 1).setOrigin(0.5);
    }

    public get body() {
        return this._body;
    }

    public move() {
        const { x, y } = this._scene.getFoodPosition();

        this._x = x;
        this._y = y;
    }

    public update() {
        const x = this._x;
        const y = this._y;

        this._scene.matter.body.setPosition(this._body, { x, y }, false);
        this._circle.setPosition(x, y);
    }
}
