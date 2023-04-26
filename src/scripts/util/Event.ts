interface Destroyable {
    scene: Phaser.Scene;
    once(event: "destroy", callback: Function): void;
}

interface Shutdownable {
    scene: undefined;
    once(event: "shutdown", callback: Function): void;
}

export default class Event extends Phaser.Events.EventEmitter {
    /**
     * Add a listener for a given event.
     * @param event — The event name.
     * @param callback — The listener function.
     * @param target — To remove listener after target element that will be destroyed or shutdown.
     * @returns This EventEmitter instance.
     */
    public override on(
        event: string,
        callback: Function,
        target?: Shutdownable | Destroyable
    ) {
        if (target) {
            if (target.scene) {
                target.once("destroy", () => super.off(event, callback));
            } else {
                target.once("shutdown", () => super.off(event, callback));
            }
        }

        return super.on(event, callback);
    }
}
