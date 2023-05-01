export class ScrollableContainer extends Phaser.GameObjects.Container {
    public visibleArea: Phaser.Geom.Rectangle;
    public inputRect: Phaser.GameObjects.Rectangle;

    constructor(
        scene: Phaser.Scene,
        x?: number | undefined,
        y?: number | undefined,
        width?: number | undefined,
        height?: number | undefined,
        children?: Phaser.GameObjects.GameObject[] | undefined
    ) {
        super(scene, x, y, children);

        const { width: w, height: h } = this.getBounds();
        this.setSize(w, h);

        if (!width) width = w;
        if (!height) height = h;

        this.visibleArea = new Phaser.Geom.Rectangle(0, 0, width, height);

        const inputRect = scene.add
            .rectangle(x, y, width, height, 0x00ff00, 0)
            .setOrigin(0);

        inputRect.setInteractive({ draggable: true });

        inputRect.on("wheel", (p, deltaX: number, deltaY: number) => {
            const { x, y } = this.visibleArea;

            this.setScrollX(x - deltaX);
            this.setScrollY(y - deltaY);
        });

        let tween;
        inputRect.on("drag", (pointer: any, dragX: any, dragY: any) => {
            const { x, y } = this.visibleArea;

            const deltaX = dragX - this.x;
            const deltaY = dragY - this.y;

            tween = this.scene.tweens.add({
                targets: { x, y },
                x: x + deltaX,
                y: y + deltaY,
                duration: 750,
                ease: "Expo.easeOut",
                onUpdate: (tween: any) => {
                    this.setScrollX(tween.targets[0].x);
                    this.setScrollY(tween.targets[0].y);
                },
                onComplete: () => (tween = null),
            });
        });
    }

    public override getBounds() {
        const bounds = super.getBounds();
        const { x, y, width, height } = bounds;

        this.input?.hitArea.setTo(x, y, width, height);

        return bounds;
    }

    public override setPosition(
        x?: number | undefined,
        y?: number | undefined,
        z?: number | undefined,
        w?: number | undefined
    ): this {
        super.setPosition(x, y, z, w);

        this.inputRect?.setPosition(x, y);

        return this;
    }

    public override setX(value: number) {
        super.setX(value);

        this.inputRect?.setX(value);

        return this;
    }

    public override setY(value: number) {
        super.setY(value);

        this.inputRect?.setY(value);

        return this;
    }

    public setScrollX(value: number) {
        const minX = this.visibleArea.width - this.width;

        if (value < minX) value = minX;
        if (value > 0) value = 0;

        this.visibleArea.x = value;

        this.each(function (child: Phaser.GameObjects.GameObject) {
            child["x"] = value;
        }, this);
    }

    public setScrollY(value: number) {
        const minY = this.visibleArea.height - this.height;

        if (value < minY) value = minY;
        if (value > 0) value = 0;

        this.visibleArea.y = value;

        this.each(function (child: Phaser.GameObjects.GameObject) {
            child["y"] = value;
        }, this);
    }
}
