import { TonConnectUI } from "@tonconnect/ui";

export default class Wallet {
    static readonly ADRESS =
        "0:509aa39486407b0fed9567a3d4e05a6321447cee2f8b6343936da2ce97b89463";
    static readonly PRICE = {
        join: 0.02,
        create: 0.01,
    };

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

                    console.log(walletAndwalletInfo);
                }
            }
        );
    }

    /**
     * Would be overwriten by Game
     */
    public onWalletConnected = () => {};

    public async moneyCharge(type: "create" | "join") {
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
            messages: [
                {
                    address: Wallet.ADRESS,
                    amount: Wallet.PRICE[type] * 1_000_000_000,
                },
            ],
        };

        try {
            const connect = this._tonConnectUI;

            // @ts-ignore
            const result = await connect.sendTransaction(transaction);

            console.log(result);

            return true;

            // // you can use signed boc to find the transaction
            // const someTxData = await myAppExplorerService.getTransaction(
            //     result.boc
            // );

            // alert("Transaction was sent successfully", someTxData);
        } catch (e) {
            console.error(e);

            return false;
        }
    }
}
