import "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";
import Boot from "./game/scenes/Boot";
import Example from "./game/scenes/Example";
import { FPS, HEIGHT, WIDTH } from "./util/globals";
import * as rexcharactercacheplugin from "./util/rexcharactercacheplugin.min.js";

const config = {
    type: Phaser.WEBGL,
    transparent: true,
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: WIDTH,
    height: HEIGHT,
    scene: [Boot, Example],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { x: 0, y: 0 },
            fps: FPS,
        },
    },
    plugins: {
        scene: [
            {
                key: "SpinePlugin",
                plugin: window.SpinePlugin,
                mapping: "spine",
            },
        ],
    },
    autoRound: true,
    desynchronized: true,
    inputActivePointers: 1,
    inputGamepad: false,
    inputKeyboard: false,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
    saveDrawingBuffer: true,
};

window.addEventListener("load", () => {
    const game = new Phaser.Game(config);
    game.plugins.install(
        "rexcharactercacheplugin",
        rexcharactercacheplugin as any
    );
});
