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

export function makeFastGradient(
    textElm: Phaser.GameObjects.Text,
    color1: string,
    color2: string
) {
    const height = textElm.height;
    const font = Number(String(textElm.style.fontSize).replace("px", ""));
    const lines = Math.floor(height / font) || 1;

    const gradient = textElm.context.createLinearGradient(
        0,
        5,
        0,
        textElm.height
    );
    new Array(lines).fill("").forEach((item, index) => {
        gradient.addColorStop(
            (1 / lines / 100) * 0 + (1 / lines) * index,
            color1
        );
        gradient.addColorStop(
            (1 / lines / 100) * 30 + (1 / lines) * index,
            color1
        );
        gradient.addColorStop(
            (1 / lines / 100) * 80 + (1 / lines) * index,
            color2
        );
        gradient.addColorStop(
            (1 / lines / 100) * 100 + (1 / lines) * index,
            color2
        );
    });

    textElm.setFill(gradient);
    return gradient;
}

export function makeGradient(
    textElm: Phaser.GameObjects.Text,
    options: Array<{ color: string; percent: number }>
) {
    const height = textElm.height;
    const font = Number(String(textElm.style.fontSize).replace("px", ""));
    const lines = Math.floor(height / font) || 1;

    if (options.length < 2)
        return console.error("at least two colors are expected");

    const gradient = textElm.context.createLinearGradient(
        0,
        5,
        0,
        textElm.height
    );
    new Array(lines).fill("").forEach((item, index) => {
        options.forEach((option) => {
            gradient.addColorStop(
                (1 / lines / 100) * option.percent + (1 / lines) * index,
                option.color
            );
        });
    });

    textElm.setFill(gradient);
    return gradient;
}
