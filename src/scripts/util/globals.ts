import Sound from "scripts/game/Sound";

export const FPS = 10;

export const WIDTH = 854;
export const HEIGHT = 1390;

export const CENTER_X = WIDTH / 2;
export const CENTER_Y = HEIGHT / 2;

export const eventManager = new Phaser.Events.EventEmitter();
export const soundManager = new Sound();

export const dataStorage = {
    bitmaps: {},
};
