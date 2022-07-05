import { audio } from "./scenes/Boot/config";

export type SupportedSoundManagers =
    | Phaser.Sound.WebAudioSoundManager
    | Phaser.Sound.HTML5AudioSoundManager;

export type SoundInstance =
    | Phaser.Sound.WebAudioSound
    | Phaser.Sound.HTML5AudioSound;

export default class Sound {
    public event = new Phaser.Events.EventEmitter();

    private enabled: boolean = true;

    private volume: number = Number(window.localStorage.getItem("volume") || 1);
    private manager: SupportedSoundManagers;
    private sound: Map<string, SoundInstance> = new Map();

    constructor() {
        this.setVolume(this.volume);
    }

    init(manager: Phaser.Sound.BaseSoundManager) {
        this.manager = manager as SupportedSoundManagers;

        for (let key in audio) {
            for (let frame_index in audio[key]) {
                const frame = audio[key][frame_index];

                this.sound.set(
                    `${key}-${frame}`,
                    this.manager.add(`${key}-${frame}`)
                );

                const sound = this.sound.get(`${key}-${frame}`);
                sound?.setVolume(this.getVolume());

                [
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
                ].forEach((event) => {
                    sound?.on(event, (...values: any) =>
                        this.event.emit(`${event}-${key}-${frame}`, values)
                    );
                });
            }
        }
    }

    setVolume(value: number) {
        this.volume = value;

        window.localStorage.setItem("volume", `${value}`);

        const volume = this.getVolume();

        [...this.sound.values()].forEach((sound) => {
            sound.setVolume(volume);
        });
    }

    getVolume() {
        return this.enabled ? this.volume : 0;
    }

    play(key: string, config?: Phaser.Types.Sound.SoundConfig) {
        this.sound.get(key)?.play("", config);
    }

    pause() {
        [...this.sound.values()].forEach((sound) => {
            sound.pause();
        });
    }

    resume() {
        [...this.sound.values()].forEach((sound) => {
            sound.resume();
        });
    }
}
