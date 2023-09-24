import { X, Y, comm, wallet } from "game/globals";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle.js";
import Button from "util/Button";
import Text from "util/Text";

export default class Menu extends Phaser.Scene {
    private roomInputLabel: Text;

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

        //

        this.createWalletConnect(X(0.5), Y(0.075));

        //

        this.createRoomEnterField(X(0.5), Y(0.475));
        this.createPlayButton(X(0.5), Y(0.55));

        //

        this.createRoundSize(X(0.5), Y(0.775));
        this.createRoomSize(X(0.5), Y(0.85));
        this.createRoomLabel(X(0.5), Y(0.85));
        this.createBtnCreate(X(0.5), Y(0.925));
    }

    public playRoom = async () => {
        let id = this.roomInputLabel.text;

        if (id.length > 10) id = "";

        const data = await comm.joinRoom(id);

        this.scene.start("Main", data);
    };

    public createRoom = async () => {
        const id = await comm.createRoom();

        this.events.emit("show_room_id", id);
    };

    private createWalletConnect(x: number, y: number) {
        const container = this.add.container(x, y);

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

        const div = document.createElement("div");
        div.setAttribute("id", "wallet");

        const text = this.add.dom(X(-0.43), -20, div);

        container.add([playBtnBG, text]);

        wallet.init();
    }

    private createRoomEnterField(x: number, y: number) {
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
            fontFamily: "uni-sans-heavy",
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

        textArea.getElement("text").on("pointerdown", () => {
            textArea.getElement("text").textEdit.node.value = "";
            setTimeout(() => this.roomInputLabel.setText("..."), 10);
        });

        textArea.alpha = 0.01;
    }

    private createPlayButton(x: number, y: number) {
        const container = this.add.container(x, y);

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
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        container.add([playBtnBG, text]);

        const button = new Button(playBtnBG);
        button.click(this.playRoom);
    }

    private createRoundSize(x: number, y: number) {
        const container = this.add.container(x, y);

        //

        const infoBG = new RoundRectangle(
            this,
            0,
            0,
            X(0.65),
            75,
            10,
            0x303030,
            1
        );

        const infoText = new Text(this, 0, 0, "Round Time Limit: 5m", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        //

        const leftBG = new RoundRectangle(
            this,
            X(-0.4),
            0,
            X(0.1),
            75,
            10,
            0xa0a0a0,
            1
        );

        const leftText = new Text(this, X(-0.4), 0, "<", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        //

        const rightBG = new RoundRectangle(
            this,
            X(0.4),
            0,
            X(0.1),
            75,
            10,
            0xa0a0a0,
            1
        );

        const rightText = new Text(this, X(0.4), 0, ">", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        //

        container.add([infoBG, infoText, leftBG, leftText, rightBG, rightText]);

        //

        this.events.on("show_room_id", () => {
            container.setVisible(false);
        });
    }

    private createRoomSize(x: number, y: number) {
        const container = this.add.container(x, y);

        //

        const infoBG = new RoundRectangle(
            this,
            0,
            0,
            X(0.65),
            75,
            10,
            0x303030,
            1
        );

        const infoText = new Text(this, 0, 0, "Room Time Limit: 15m", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        //

        const leftBG = new RoundRectangle(
            this,
            X(-0.4),
            0,
            X(0.1),
            75,
            10,
            0xa0a0a0,
            1
        );

        const leftText = new Text(this, X(-0.4), 0, "<", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        //

        const rightBG = new RoundRectangle(
            this,
            X(0.4),
            0,
            X(0.1),
            75,
            10,
            0xa0a0a0,
            1
        );

        const rightText = new Text(this, X(0.4), 0, ">", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        //

        container.add([infoBG, infoText, leftBG, leftText, rightBG, rightText]);

        //

        this.events.on("show_room_id", () => {
            container.setVisible(false);
        });
    }

    private createRoomLabel(x: number, y: number) {
        const roomLabel = new Text(this, x, y, "", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            color: "lightgreen",
            align: "center",
        }).setOrigin(0.5);

        roomLabel.setVisible(false);

        this.events.on("show_room_id", (id: string) => {
            roomLabel.setText(id);
            roomLabel.setVisible(true);
        });
    }

    private createBtnCreate(x: number, y: number) {
        const container = this.add.container(x, y);

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
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        container.add([playBtnBG, text]);

        const button = new Button(playBtnBG);
        button.click(this.playRoom);
    }
}
