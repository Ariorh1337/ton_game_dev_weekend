import { EngineWorker, HEIGHT_CENTER, WIDTH_CENTER } from "game/globals";
import Button from "util/Button";

export default class Example extends Phaser.Scene {
    constructor() {
        super({ key: "Example" });
    }

    public create() {
        // Create normal image
        this.add.image(WIDTH_CENTER, HEIGHT_CENTER, "ui-background-tile");

        // Create atlas image
        this.add.image(WIDTH_CENTER, 200, `game-atlas`, `font-9.png`);

        // Create aseprite animation
        this.add
            .sprite(WIDTH_CENTER, HEIGHT_CENTER - 220, "game-poof")
            .play({ key: "poof", repeat: -1 });

        // Create spine animation
        this.add
            .spine(WIDTH_CENTER, HEIGHT_CENTER, "game-coin")
            .play("animation", true);

        // Create tween animation
        this.tweens.add({
            targets: this.add.image(
                WIDTH_CENTER,
                HEIGHT_CENTER + 200,
                "ui-hand"
            ),
            y: "+=15",
            duration: 500,
            repeat: -1,
            yoyo: true,
        });

        // Create button
        new Button(
            this.add.image(WIDTH_CENTER, HEIGHT_CENTER + 290, "ui-warning")
        ).click((btn: Button, elm: Phaser.GameObjects.Image) => {
            if (elm.getData("tint")) {
                elm.clearTint();
                elm.setData("tint", 0);
            } else {
                elm.setTint(0xff00ff);
                elm.setData("tint", 1);
            }
        });

        // Create bitmap text
        this.add.bitmapText(
            WIDTH_CENTER + 100,
            HEIGHT_CENTER,
            "test",
            "12345890."
        );

        // Create engine worker
        const worker = new EngineWorker();
        worker.onmessage = (event: any) => {
            console.log("Parent", event);
        };
        worker.postMessage({
            type: "start",
            data: "Some Test Data",
        });

        // Create FPS
        this.create_fps();
    }

    private create_fps() {
        const text = this.add.bitmapText(30, 30, "test").setOrigin(0);

        const update = () => {
            text.setText(`FPS: ${Math.trunc(this.game.loop.actualFps)}`);
            this.time.delayedCall(1000, update);
        };

        update();
    }
}
