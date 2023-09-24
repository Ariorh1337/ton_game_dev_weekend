import { X, Y, wallet } from "game/globals";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

export default class TopBar extends Phaser.Scene {
    constructor() {
        super({ key: "TopBar" });
    }

    public create() {
        this.createWalletConnect(X(0.5), Y(0.075));
    }

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
}
