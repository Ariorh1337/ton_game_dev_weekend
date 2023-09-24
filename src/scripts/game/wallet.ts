import { TonConnectUI } from "@tonconnect/ui";

export default class Wallet {
    static readonly TESTNET = "https://testnet.toncenter.com/api/v2/jsonRPC";
    static readonly MAINNET = "https://toncenter.com/api/v2/jsonRPC";

    private _tonConnectUI: TonConnectUI;

    constructor() {}

    public async init() {
        this._tonConnectUI = new TonConnectUI({
            manifestUrl:
                "https://e1bd-37-188-174-201.ngrok-free.app/assets/tonconnect-manifest.json",
            buttonRootId: "wallet",
        });

        const unsubscribe = this._tonConnectUI.onStatusChange(
            (walletAndwalletInfo) => {
                if (this._tonConnectUI.connected) {
                    this.onWalletConnected();

                    const tonConnectUI = this._tonConnectUI;
                    const currentWallet = tonConnectUI.wallet;
                    const currentAccount = tonConnectUI.account;
                    const currentIsConnectedStatus = tonConnectUI.connected;

                    console.log(
                        currentWallet,
                        currentAccount,
                        currentIsConnectedStatus
                    );
                }
            }
        );
    }

    /**
     * Would be overwriten by Game
     */
    public onWalletConnected = () => {};
}
