export class ScrollableContainer extends Phaser.GameObjects.Container {
    public visibleArea: Phaser.Geom.Rectangle;

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

        this.setInteractive({ draggable: true });

        this.on("wheel", (p, deltaX: number, deltaY: number) => {
            const { x, y } = this.visibleArea;

            this.setScrollX(x - deltaX);
            this.setScrollY(y - deltaY);
        });

        let tween;
        this.on("drag", (pointer: any, dragX: any, dragY: any) => {
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
