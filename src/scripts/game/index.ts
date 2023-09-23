import "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";

import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import { array_at, array_flat } from "util/polyfill";

import Main from "game/scenes/Main";
import Boot from "./scenes/Boot";
import End from "./scenes/End";
import Menu from "./scenes/Menu";

import { HEIGHT, WIDTH, lang, loader, setLanguage } from "./globals";

array_at();
array_flat();

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
    scene: [Boot, Menu, Main, End],
    physics: {
        default: "matter",
        matter: {
            enableSleeping: true,
            debug: {
                showAxes: false,
                showAngleIndicator: true,
                angleColor: 0xe81153,

                showBroadphase: false,
                broadphaseColor: 0xffb400,

                showBounds: false,
                boundsColor: 0xffffff,

                showVelocity: true,
                velocityColor: 0x00aeef,

                showCollisions: true,
                collisionColor: 0xf5950c,

                showSeparations: false,
                separationColor: 0xffa500,

                showBody: true,
                showStaticBody: true,
                showInternalEdges: true,

                renderFill: false,
                renderLine: true,

                fillColor: 0x106909,
                fillOpacity: 1,
                lineColor: 0x28de19,
                lineOpacity: 1,
                lineThickness: 1,

                staticFillColor: 0x0d177b,
                staticLineColor: 0x1327e4,

                showSleeping: true,
                staticBodySleepOpacity: 1,
                sleepFillColor: 0x464646,
                sleepLineColor: 0x999a99,

                showSensors: true,
                sensorFillColor: 0x0d177b,
                sensorLineColor: 0x1327e4,

                showPositions: true,
                positionSize: 4,
                positionColor: 0xe042da,

                showJoint: true,
                jointColor: 0xe0e042,
                jointLineOpacity: 1,
                jointLineThickness: 2,

                pinSize: 4,
                pinColor: 0x42e0e0,

                springColor: 0xe042e0,

                anchorColor: 0xefefef,
                anchorSize: 4,

                showConvexHulls: true,
                hullColor: 0xd703d0,
            },
        },
    },
    plugins: {
        scene: [
            {
                key: "SpinePlugin",
                plugin: window.SpinePlugin,
                mapping: "spine",
            },
            {
                key: "rexUI",
                plugin: RexUIPlugin,
                mapping: "rexUI",
            },
        ],
    },
    callbacks: {
        postBoot: function (game: Phaser.Game) {},
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

window.addEventListener("load", async () => {
    await setLanguage(lang);
    loader.fonts();

    const game = new Phaser.Game(config);
});
