import { X, Y } from "game/globals";
import Main from "../Main";

export default class WorldBorder extends Phaser.GameObjects.Container {
    constructor(scene: Main) {
        super(scene, X(0.5), Y(0.5));

        scene.add.existing(this);

        const left = new Phaser.Geom.Line(X(-0.5), Y(-0.5), X(-0.5), Y(0.6));
        const right = new Phaser.Geom.Line(X(0.5), Y(-0.5), X(0.5), Y(0.6));
        const top = new Phaser.Geom.Line(X(-0.5), Y(-0.5), X(0.6), Y(-0.5));
        const bottom = new Phaser.Geom.Line(X(-0.5), Y(0.5), X(0.6), Y(0.5));

        const topContainer = scene.add.container(0, 0);
        const bottomContainer = scene.add.container(0, 0);
        const leftContainer = scene.add.container(0, 0);
        const rightContainer = scene.add.container(0, 0);

        this.add([
            topContainer,
            bottomContainer,
            leftContainer,
            rightContainer,
        ]);

        left.getPoints(60).forEach((p) => {
            const triangle = this.createTriangle(0, 0);
            triangle.setPosition(p.x, p.y);
            leftContainer.add(triangle);
        });
        right.getPoints(60).forEach((p) => {
            const triangle = this.createTriangle(0, 0);
            triangle.setPosition(p.x, p.y);
            triangle.setAngle(180);
            rightContainer.add(triangle);
        });
        top.getPoints(40).forEach((p) => {
            const triangle = this.createTriangle(0, 0);
            triangle.setPosition(p.x, p.y);
            triangle.setAngle(90);
            topContainer.add(triangle);
        });
        bottom.getPoints(40).forEach((p) => {
            const triangle = this.createTriangle(0, 0);
            triangle.setPosition(p.x, p.y);
            triangle.setAngle(180 + 90);
            bottomContainer.add(triangle);
        });

        //

        scene.tweens.add({
            targets: leftContainer,
            y: "-=25",
            yoyo: true,
            repeat: -1,
            duration: 500,
        });
        scene.tweens.add({
            targets: rightContainer,
            y: "-=25",
            yoyo: true,
            repeat: -1,
            duration: 500,
            delay: 500,
        });

        scene.tweens.add({
            targets: topContainer,
            x: "-=25",
            yoyo: true,
            repeat: -1,
            duration: 500,
        });
        scene.tweens.add({
            targets: bottomContainer,
            x: "-=25",
            yoyo: true,
            repeat: -1,
            duration: 500,
            delay: 500,
        });
    }

    private createTriangle(x: number, y: number) {
        return new Phaser.GameObjects.Triangle(
            this.scene,
            x,
            y,
            0,
            -20,
            40,
            0,
            0,
            20,
            0x505050,
            1
        );
    }
}
