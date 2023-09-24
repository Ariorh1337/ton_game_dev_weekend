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

export function msToTime(ms) {
    // Calculate the total seconds
    const totalSeconds = Math.floor(ms / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format the result as "00:00"
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}
