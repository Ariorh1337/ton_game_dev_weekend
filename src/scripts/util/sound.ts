interface BaseSound extends Phaser.Sound.BaseSound {
    setVolume: (value: number) => void;
}

interface BaseSoundManager extends Phaser.Sound.BaseSoundManager {
    add: (key: string) => BaseSound;
}

/**
 * List of events that can be emitted by a sound object
 */
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

/**
 * Sound class that manages audio playback
 */
export default class Sound {
    private volume = 1;
    private enabled = true;
    private list = new Map<string, BaseSound>();
    private event = new Phaser.Events.EventEmitter();

    private manager: BaseSoundManager;

    /**
     * Initializes the sound object with a sound manager
     * @param manager - The sound manager to use
     */
    public init(manager: BaseSoundManager, audio: { key: string }[]): void {
        this.manager = manager;

        audio.forEach((item) => {
            const sound = this.manager.add(item.key);
            this.list.set(item.key, sound);

            sound.setVolume(this.getVolume());

            eventList.forEach((event) => {
                sound.on(event, (...values: any[]) =>
                    this.event.emit(`${event}-${item.key}`, values)
                );
            });
        });
    }

    /**
     * Plays a sound with the given key and configuration
     * @param key - The key of the sound to play
     * @param config - The configuration for the sound
     */
    public play(key: string, config: any = undefined): void {
        this.list.get(key)?.play("", config);
    }

    /**
     * Sets the volume of all sounds
     * @param value - The volume value to set
     */
    public setVolume(value: number): void {
        this.volume = value;

        const volume = this.getVolume();

        [...this.list.values()].forEach((sound) => {
            sound.setVolume(volume);
        });
    }

    /**
     * Gets the current volume of all sounds
     * @returns The current volume value
     */
    public getVolume(): number {
        return this.enabled ? this.volume : 0;
    }

    /**
     * Pauses all sounds
     */
    public pause(): void {
        [...this.list.values()].forEach((sound) => {
            sound.pause();
        });
    }

    /**
     * Resumes all sounds
     */
    public resume(): void {
        [...this.list.values()].forEach((sound) => {
            sound.resume();
        });
    }
}
