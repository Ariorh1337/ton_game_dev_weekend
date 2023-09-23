import { X, Y } from "game/globals";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import Button from "util/Button";
import Text from "util/Text";

export default class Menu extends Phaser.Scene {
    private roomInputLabel: Text;
    private roomLabel: Text;

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

        this.createRoomEnterField();
        this.createPlayButton();

        //

        this.createRoomLabel();
        this.createBtnCreate();
    }

    public playRoom() {
        // Ask backend for playing game with this.roomInputLabel.text as room id
    }

    public createRoom() {
        // Ask backend to create room
    }

    private createRoomEnterField() {
        const [x, y] = [X(0.5), Y(0.075)];

        const container = this.add.container(x, y);

        const roomInputBG = new RoundRectangle(
            this,
            0,
            0,
            X(0.9),
            75,
            10,
            0x303030,
            1
        );
        this.add.existing(roomInputBG);

        const content = `Please enter youre room number here`;
        const textElement = new Text(this, 0, 0, content, {
            fontFamily: "Arial",
            fontSize: "32px",
            align: "center",
        }).setOrigin(0.5);

        this.roomInputLabel = textElement;

        container.add([roomInputBG, textElement]);

        const textArea = this.rexUI.add
            .textAreaInput({
                x: container.x,
                y: container.y,
                width: roomInputBG.width,
                height: roomInputBG.height,

                // background: roomInputBG,

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

                content: "",
            })
            .layout()
            .on("textchange", function (text) {
                text = text.replaceAll("\n", "");
                text = text.trim();

                textElement.setText(text || content);
            });

        textArea.alpha = 0.01;
    }

    private createPlayButton() {
        const container = this.add.container(X(0.5), Y(0.15));

        const playBtnBG = new RoundRectangle(
            this,
            0,
            0,
            X(0.9),
            75,
            10,
            0x303030,
            1
        );

        const text = new Text(this, 0, 0, "Play", {
            fontFamily: "Arial",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        container.add([playBtnBG, text]);

        const button = new Button(playBtnBG);
        button.click(this.playRoom);
    }

    private createRoomLabel() {
        this.roomLabel = new Text(this, X(0.5), Y(0.875), "TEST TEST", {
            fontFamily: "Arial",
            fontSize: "38px",
            color: "lightgreen",
            align: "center",
        }).setOrigin(0.5);
    }

    private createBtnCreate() {
        const container = this.add.container(X(0.5), Y(0.925));

        const playBtnBG = new RoundRectangle(
            this,
            0,
            0,
            X(0.9),
            75,
            10,
            0x303030,
            1
        );

        const text = new Text(this, 0, 0, "Create Room", {
            fontFamily: "Arial",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        container.add([playBtnBG, text]);

        const button = new Button(playBtnBG);
        button.click(this.playRoom);
    }
}
