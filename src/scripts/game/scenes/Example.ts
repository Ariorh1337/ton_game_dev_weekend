import { EngineWorker, X, Y, i18n } from "game/globals";
import Button from "util/Button";
import { ScrollableContainer } from "util/ScrollableContainer";
import { List } from "util/extra";

export default class Example extends Phaser.Scene {
    constructor() {
        super({ key: "Example" });
    }

    public create() {
        // Create normal image
        this.add.image(X(0.5), Y(0.5), "ui-background-tile");

        // Create atlas image
        this.add.image(X(0.5), 200, `game-atlas`, `font-9.png`);

        // Create aseprite animation
        this.add
            .sprite(X(0.5), Y(0.5) - 220, "game-poof")
            .play({ key: "poof", repeat: -1 });

        // Create spine animation
        this.add.spine(X(0.15), Y(0.4), "game-coin").play("animation", true);

        // Create tween animation
        this.tweens.add({
            targets: this.add.image(X(0.5), Y(0.5) + 200, "ui-hand"),
            y: "+=15",
            duration: 500,
            repeat: -1,
            yoyo: true,
        });

        // Create button
        {
            const frame = this.add.image(X(0.5), Y(0.5) + 290, "ui-warning");

            const button = new Button(frame);

            // Adds a default tints to the button (over, out, down, up)
            button.defaults(frame);

            button.click((btn, elm) => {
                console.log("Clicked", btn, elm);
            });
        }

        // Create bitmap text
        this.add.bitmapText(
            X(0.5) + 100,
            Y(0.5),
            "golden_test_font",
            i18n("test")
        );

        // Create normal text
        this.add.text(X(0.5) - 100, Y(0.5), i18n("test"), {
            fontFamily: "uni-sans-heavy",
            fontSize: 32,
            color: "#000000",
        });

        // Create ScrollableContainer
        new ScrollableContainer(this, X(0.5), Y(0.75), 200, 200, [
            this.add.text(0, 0, new List(100, () => new Array(30).fill("0"))),
        ]).higlightInputRect(true);

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
        const text = this.add
            .bitmapText(30, 30, "golden_test_font")
            .setOrigin(0);

        const update = () => {
            text.setText(`FPS: ${Math.trunc(this.game.loop.actualFps)}`);
            this.time.delayedCall(1000, update);
        };

        update();
    }
}
