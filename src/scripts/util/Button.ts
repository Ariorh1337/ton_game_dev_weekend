export default class Button {
    public scene: Phaser.Scene;
    public element: Phaser.GameObjects.GameObject;

    private events: Map<string, Function>;
    private enabled: boolean;
    private delay: number;
    private timeout: boolean;

    constructor(element: Phaser.GameObjects.GameObject) {
        this.scene = element.scene;
        this.element = element;

        this.enabled = true;
        this.delay = 200;
        this.timeout = false;
        this.events = new Map();

        this.events.set("click", function () {});
        this.events.set("over", function () {});
        this.events.set("out", function () {});

        element.setInteractive();
        element.on("pointerdown", this.on_click_template.bind(this));
        element.on("pointerover", this.on_over_template.bind(this));
        element.on("pointerout", this.on_out_template.bind(this));
    }

    public setDelay(value: number) {
        this.delay = value;
        return this;
    }

    public enable() {
        this.enabled = true;
        return this;
    }

    public disable() {
        this.enabled = false;
        return this;
    }

    public click(callback: Function) {
        this.events.set("click", callback);
        return this;
    }

    public over(callback: Function) {
        this.events.set("over", callback);
        return this;
    }

    public out(callback: Function) {
        this.events.set("out", callback);
        return this;
    }

    private on_click_template() {
        if (!this.enabled) return;
        if (this.timeout) return;

        document.body.style.cursor = "auto";

        this.timeout = true;
        this.scene.time.delayedCall(this.delay, () => {
            this.timeout = false;
        });

        this.events.get("click")!(this, this.element);
    }

    private on_over_template() {
        if (!this.enabled) return;
        if (this.timeout) return;

        document.body.style.cursor = "pointer";

        this.events.get("over")!(this, this.element);
    }

    private on_out_template() {
        document.body.style.cursor = "auto";

        if (!this.enabled) return;
        if (this.timeout) return;

        this.events.get("out")!(this, this.element);
    }
}
