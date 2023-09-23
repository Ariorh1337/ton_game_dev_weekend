import { X, Y } from "game/globals";
import Text from "util/Text";

export default class End extends Phaser.Scene {
    constructor() {
        super({ key: "End" });
    }

    public create() {
        const text = new Text(
            this,
            X(0.5),
            Y(0.5),
            "Game is ended, please check the results",
            {
                fontFamily: "Arial",
                fontSize: "48px",
                align: "center",
                wordWrap: { width: 600, useAdvancedWrap: true },
            }
        );

        text.setOrigin(0.5, 0.5);
    }
}
