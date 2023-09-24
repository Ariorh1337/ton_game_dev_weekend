import { Room } from "game/commucator";
import { X, Y } from "game/globals";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import Button from "util/Button";
import Text from "util/Text";
import { msToTime } from "util/extra";

export default class End extends Phaser.Scene {
    private _room: Room;
    private _score: number;

    constructor() {
        super({ key: "End" });
    }

    public init(data: { room: Room; score: number }) {
        this._room = data.room;
        this._score = data.score;
    }

    public create() {
        this.createScore();
        this.createEndTime();
        this.createBtnMenu();
    }

    private createBtnMenu() {
        const container = this.add.container(X(0.5), Y(0.925));

        const rightBG = new RoundRectangle(
            this,
            X(-0.4),
            0,
            X(0.15),
            75,
            10,
            0xa0a0a0,
            1
        );

        const rightText = new Text(this, X(-0.4), 0, "Menu", {
            fontFamily: "uni-sans-heavy",
            fontSize: "38px",
            align: "center",
        }).setOrigin(0.5);

        container.add([rightBG, rightText]);

        new Button(rightBG).click(() => {
            this.scene.start("Menu");
        });
    }

    private createScore() {
        const text = new Text(
            this,
            X(0.5),
            Y(0.35),
            `Your score is: ${this._score}`,
            {
                fontFamily: "uni-sans-heavy",
                fontSize: "48px",
                align: "center",
                wordWrap: { width: 600, useAdvancedWrap: true },
            }
        ).setOrigin(0.5);
    }

    private createEndTime() {
        const endTime =
            this._room.roomStartDate * 1000 + this._room.roomDuration;

        const str = "Game is ended\n\nPlease check the results after: ";
        const text = new Text(
            this,
            X(0.5),
            Y(0.5),
            str + msToTime(endTime - Date.now()),
            {
                fontFamily: "uni-sans-heavy",
                fontSize: "48px",
                align: "center",
                wordWrap: { width: 600, useAdvancedWrap: true },
            }
        ).setOrigin(0.5);

        this.tweens.addCounter({
            duration: 500,
            repeat: -1,
            onRepeat: () => {
                text.setText(str + msToTime(endTime - Date.now()));
            },
        });
    }
}
