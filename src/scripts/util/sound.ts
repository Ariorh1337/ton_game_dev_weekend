import config from "src/configs/assets";

const eventList = [
    "play",
    "complete",
    "looped",
    "pause",
    "resume",
    "stop",
    "mute",
    "volume",
    "detune",
    "rate",
    "seek",
    "loop",
] as const;

export default class Sound {
    private volume = 1;
    private enabled = true;
    private list = new Map();
    private event = new Phaser.Events.EventEmitter();

    private manager: Phaser.Sound.BaseSoundManager;

    constructor() {}

    public init(manager: Phaser.Sound.BaseSoundManager) {
        this.manager = manager;

        config.audio.forEach((item) => {
            this.list.set(item.key, this.manager.add(item.key));

            const sound = this.list.get(item.key);
            sound?.setVolume(this.getVolume());

            eventList.forEach((event) => {
                sound?.on(event, (...values) =>
                    this.event.emit(`${event}-${item.key}`, values)
                );
            });
        });
    }

    public play(key, config: any = undefined) {
        this.list.get(key)?.play("", config);
    }

    public setVolume(value) {
        this.volume = value;

        const volume = this.getVolume();

        [...this.list.values()].forEach((sound) => {
            sound.setVolume(volume);
        });
    }

    public getVolume() {
        return this.enabled ? this.volume : 0;
    }

    public pause() {
        [...this.list.values()].forEach((sound) => {
            sound.pause();
        });
    }

    public resume() {
        [...this.list.values()].forEach((sound) => {
            sound.resume();
        });
    }
}
