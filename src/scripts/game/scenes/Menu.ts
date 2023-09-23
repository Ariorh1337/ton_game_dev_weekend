import { X, Y } from "game/globals";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import { delay } from "util/extra";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu" });
    }

    public create() {
        const rect = new RoundRectangle(
            this,
            X(0.5),
            Y(0.5),
            X(0.95),
            Y(0.95),
            10,
            0x505050,
            1
        );
        this.add.existing(rect);

        const roomInputBG = new RoundRectangle(
            this,
            X(0.5),
            Y(0.075),
            X(0.9),
            75,
            10,
            0x303030,
            1
        );
        this.add.existing(roomInputBG);

        const COLOR_PRIMARY = 0x4e342e;
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;

        var content = `Please enter youre room number here`;

        var textArea = this.rexUI.add
            .textAreaInput({
                x: roomInputBG.x,
                y: roomInputBG.y,
                width: roomInputBG.width,
                height: roomInputBG.height,

                background: roomInputBG,

                text: {
                    style: {
                        fontSize: 28,
                        backgroundBottomY: 1,
                        backgroundHeight: 20,

                        "cursor.color": "black",
                        "cursor.backgroundColor": "white",
                    },
                },

                space: {
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 0,

                    text: 11,
                    header: 0,
                    footer: 0,
                },

                mouseWheelScroller: {
                    focus: false,
                    speed: 0.1,
                },

                content: content,
            })
            .layout()
            .on("textchange", function (text) {
                console.log(text);
            });

        textArea
            .getElement("text")
            .on("pointerdown", () =>
                delay(this, 500).then(() => textArea.setText(""))
            );

        (window as any).textArea = textArea;
    }
}
