import { HEIGHT_CENTER, loader, WIDTH_CENTER } from "game/globals";
import config from "src/configs/assets";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: "Boot",
            pack: {
                files: loader.getPreload(),
            },
        });
    }

    public preload() {
        this.createBackground();
        this.createLoaderBar();

        loader.start(this.load);
    }

    public create() {
        this.initAsepriteAnimations();

        this.time.delayedCall(50, () => {
            this.scene.start("Example");
        });
    }

    private initAsepriteAnimations() {
        config.aseprite.forEach((frame) => {
            this.anims.createFromAseprite(frame.key);
        });
    }

    private createBackground() {
        this.add.sprite(WIDTH_CENTER, HEIGHT_CENTER, "loading-background");
    }

    private createLoaderBar() {
        const [x, y] = [WIDTH_CENTER, HEIGHT_CENTER - 150];

        this.add.sprite(x, y, "loading-fill-bk");

        const filler = this.add.sprite(x, y, "loading-fill");
        const frame = this.add.sprite(x, y, "loading-frame");

        const [width, height] = [frame.width, frame.height];
        const mask = this.add
            .rectangle(x - width / 2, y, 0, height, 0xffffff, 1)
            .setOrigin(0, 0.5)
            .setVisible(false);

        filler.mask = new Phaser.Display.Masks.BitmapMask(this, mask);

        this.load.on("progress", (value: number) => {
            this.tweens.add({
                targets: [mask],
                width: value * frame.width,
                duration: 200,
            });
        });
    }
}
