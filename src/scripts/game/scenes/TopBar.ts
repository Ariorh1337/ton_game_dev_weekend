import { X, Y, comm, wallet } from "game/globals";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

export default class TopBar extends Phaser.Scene {
    private balance: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "TopBar" });
    }

    public create() {
        this.createWalletConnect(X(0.5), Y(0.075));

        this.time.delayedCall(1000, () => this.updateBalance());

        this.time.addEvent({
            delay: 10000,
            callback: () => this.updateBalance(),
            loop: true,
        });
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

        //

        const div = document.createElement("div");
        div.setAttribute("id", "wallet");

        const dom = this.add.dom(X(0.24), -20, div);

        //

        this.balance = this.add
            .text(X(-0.4), 0, "Balance: 0 TON", {
                fontFamily: "uni-sans-heavy",
                fontSize: "32px",
                color: "#ffffff",
            })
            .setOrigin(0, 0.5);

        //

        container.add([playBtnBG, dom, this.balance]);

        wallet.init();
    }

    private async updateBalance() {
        if (wallet.adress) {
            const amount = await comm.getBalance(wallet.adress);
            const balance = amount / 1000000000;

            this.balance.setText(`Balance: ${balance} TON`);
        }
    }
}
