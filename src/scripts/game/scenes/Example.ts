import Button from "scripts/util/Button";
import { CENTER_X, CENTER_Y, dataStorage } from "scripts/util/globals";

export default class Example extends Phaser.Scene {
    constructor() {
        super({ key: "Example" });
    }

    public create() {
        // Create normal image
        this.add.image(CENTER_X, CENTER_Y, "ui-background-tile");

        // Create atlas image
        this.add.image(CENTER_X, 200, `game-atlas`, `font-9.png`);

        // Create aseprite animation
        this.add
            .sprite(CENTER_X, CENTER_Y - 220, "game-poof")
            .play({ key: "poof", repeat: -1 });

        // Create spine animation
        this.add.spine(CENTER_X, CENTER_Y, "game-coin").play("animation", true);

        // Create tween animation
        this.tweens.add({
            targets: this.add.image(CENTER_X, CENTER_Y + 200, "ui-hand"),
            y: "+=15",
            duration: 500,
            repeat: -1,
            yoyo: true,
        });

        // Create button
        new Button(
            this.add.image(CENTER_X, CENTER_Y + 290, "ui-warning")
        ).click((btn: Button, elm: Phaser.GameObjects.Image) => {
            if (elm.getData("tint")) {
                elm.clearTint();
                elm.setData("tint", 0);
            } else {
                elm.setTint(0xff00ff);
                elm.setData("tint", 1);
            }
        });

        // Vignette animation
        const element = document.getElementById("vignette");
        this.tweens.addCounter({
            from: 0,
            to: 1,
            duration: 2500,
            repeat: -1,
            yoyo: true,
            onUpdate: (tween: Phaser.Tweens.Tween, data: { value: number }) => {
                (element as any).style.opacity = data.value.toFixed(2);
            },
        });

        this.create_fps();
    }

    private create_fps() {
        const fpsText = this.add
            .bitmapText(CENTER_X, CENTER_Y, "Uni_Sans_Heavy_24_green")
            .setOrigin(0.5);
        dataStorage.bitmaps["Uni_Sans_Heavy_24_green"].overrideBitmapText(
            fpsText
        );

        this.events.on("render", function (targetScene: any, duration: any) {
            if (!fpsText.visible) return;
            fpsText.setText(
                `FPS: ${Math.max(
                    Math.trunc(targetScene.game.loop.actualFps),
                    30
                )}`
            );
        });
    }
}
