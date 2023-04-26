export class Swear {
    public state = "pending" as "pending" | "done" | "canceled" | "rejected";
    public promise: Promise<any>;

    private _cancel: boolean;
    private _resolve!: Function;
    private _reject!: Function;

    constructor() {
        this._cancel = false;

        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    cancel = () => {
        this._cancel = true;
        this.state = "canceled";
    };

    resolve = (data?: any) => {
        if (this._cancel) return;
        this.state = "done";
        this._resolve(data);
    };

    reject = (data?: any) => {
        if (this._cancel) return;
        this.state = "rejected";
        this._reject(data);
    };
}

export class List extends Array {
    constructor(i: number, callback = Function("i", "return i;")) {
        super();
        return Array.from({ length: i }, (e, i) => callback(i));
    }
}

export function tween(
    scene: Phaser.Scene,
    config: object | Phaser.Types.Tweens.TweenBuilderConfig
) {
    return new Promise((resolve) => {
        scene.tweens.add({
            ...config,
            onComplete: resolve,
        } as any);
    });
}

export function delay(scene: Phaser.Scene, time: number) {
    return new Promise((resolve) => {
        scene.time.delayedCall(time, resolve);
    });
}

export function transition(scene: Phaser.Scene, option: "Out" | "In") {
    const color = Phaser.Display.Color.HexStringToColor("#000000");
    const duration = 500;

    const params = [color.red, color.green, color.blue] as const;

    if (option === "Out") scene.cameras.main.fadeOut(duration, ...params);
    if (option === "In") scene.cameras.main.fadeIn(duration, ...params);

    return delay(scene, duration);
}
