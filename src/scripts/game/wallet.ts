import { TonConnectUI } from "@tonconnect/ui";

export default class Wallet {
    static readonly TESTNET = "https://testnet.toncenter.com/api/v2/jsonRPC";
    static readonly MAINNET = "https://toncenter.com/api/v2/jsonRPC";

    public adress: string = "";

    private _tonConnectUI: TonConnectUI;

    constructor() {}

    public async init() {
        this._tonConnectUI = new TonConnectUI({
            manifestUrl:
                "https://www.ariorh.com/games/dev/ton_shot_ball/tonconnect-manifest.json",
            buttonRootId: "wallet",
        });

        const unsubscribe = this._tonConnectUI.onStatusChange(
            (walletAndwalletInfo) => {
                if (this._tonConnectUI.connected) {
                    this.onWalletConnected();

                    const tonConnectUI = this._tonConnectUI;
                    const currentAccount = tonConnectUI.account;

                    this.adress = currentAccount?.address || "";
                }
            }
        );
    }

    /**
     * Would be overwriten by Game
     */
    public onWalletConnected = () => {};
}
