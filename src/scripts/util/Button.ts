export default class Button {
    public scene: Phaser.Scene;
    public element: Phaser.GameObjects.GameObject;

    private events: Map<string, Function>;
    private _enabled: boolean;
    private delay: number;
    private timeout: boolean;

    constructor(element: Phaser.GameObjects.GameObject) {
        this.scene = element.scene;
        this.element = element;

        this._enabled = true;
        this.delay = 200;
        this.timeout = false;
        this.events = new Map();

        this.events.set("click", function () {});
        this.events.set("down", function () {});
        this.events.set("up", function () {});
        this.events.set("over", function () {});
        this.events.set("out", function () {});

        element.setInteractive({ useHandCursor: true });

        element.on("pointerover", this.on_over_template.bind(this));
        element.on("pointerout", this.on_out_template.bind(this));
        element.on("pointerdown", this.on_down_template.bind(this));
        element.on("pointerup", this.on_up_template.bind(this));
    }

    public setDelay(value: number) {
        this.delay = value;
        return this;
    }

    public enable() {
        this._enabled = true;
        return this;
    }

    public disable() {
        this._enabled = false;
        return this;
    }

    public click(callback?: Function) {
        if (callback) {
            this.events.set("click", callback);
        } else {
            this.on_up_template();
        }

        return this;
    }

    public over(callback?: Function) {
        if (callback) {
            this.events.set("over", callback);
        } else {
            this.on_over_template();
        }

        return this;
    }

    public out(callback?: Function) {
        if (callback) {
            this.events.set("out", callback);
        } else {
            this.on_out_template();
        }

        return this;
    }

    public down(callback?: Function) {
        if (callback) {
            this.events.set("down", callback);
        } else {
            this.on_down_template();
        }

        return this;
    }

    public up(callback?: Function) {
        if (callback) {
            this.events.set("up", callback);
        } else {
            this.on_up_template();
        }

        return this;
    }

    public tint(color: number) {
        if (this.element instanceof Phaser.GameObjects.Image) {
            this.element.setTint(color);
        }

        return this;
    }

    public alpha(color: number) {
        (this.element as any)?.setAlpha(color);
        return this;
    }

    public visible(value: boolean) {
        (this.element as any)?.setVisible(value);
        this._enabled = value;
        return this;
    }

    public defaults(img?: Phaser.GameObjects.Image) {
        const setTint = (
            elm: Phaser.GameObjects.Image | Button,
            color: number
        ) => {
            if (elm instanceof Phaser.GameObjects.Image) {
                elm.setTint(color);
            }
            if (elm instanceof Button) {
                elm.tint(color);
            }
        };

        this.over((btn: Button) => {
            if (this._enabled) setTint(img || btn, 0xc5c5c5);
        });
        this.out((btn: Button) => {
            if (this._enabled) setTint(img || btn, 0xffffff);
        });
        this.down((btn: Button) => {
            if (this._enabled) setTint(img || btn, 0x9e9e9e);
        });
        this.up((btn: Button) => {
            if (this._enabled) setTint(img || btn, 0xffffff);
        });

        return this;
    }

    public get x() {
        return (this.element as any).x || 0;
    }

    public get y() {
        return (this.element as any).y || 0;
    }

    public get enabled() {
        return this._enabled;
    }

    private on_over_template() {
        if (!this._enabled) return;
        if (this.timeout) return;

        this.events.get("over")!(this, this.element);
    }

    private on_out_template() {
        if (!this._enabled) return;
        if (this.timeout) return;

        this.events.get("out")!(this, this.element);
    }

    private on_down_template() {
        if (!this._enabled) return;
        if (this.timeout) return;

        this.events.get("down")!(this, this.element);
    }

    private on_up_template() {
        if (!this._enabled) return;
        if (this.timeout) return;

        this.timeout = true;
        this.scene.time.delayedCall(this.delay, () => {
            this.timeout = false;
        });

        this.events.get("up")!(this, this.element);
        this.events.get("click")!(this, this.element);
    }
}
