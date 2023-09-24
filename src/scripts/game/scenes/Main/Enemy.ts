import Main from "../Main";

export default class Enemy {
    private _scene: Main;
    private _body: MatterJS.BodyType;
    private _container: Phaser.GameObjects.Container;

    constructor(scene: Main) {
        this._scene = scene;

        const { x, y } = scene.getFoodPosition();

        this._body = scene.matter.add.circle(x, y, 16, {
            label: "Enemy",
        });

        this._container = scene.add.container(x, y);
        this._container.add([
            this.createTriangle(0, 0),
            this.createTriangle(0, 0).setAngle(90),
            this.createTriangle(0, 0).setAngle(180),
            this.createTriangle(0, 0).setAngle(270),
        ]);

        scene.tweens.add({
            targets: this._container,
            angle: 360,
            repeat: -1,
            duration: 1000,
        });
    }

    public move(position: { x: number; y: number }) {
        const { x, y } = position;

        this._scene.matter.body.setPosition(this._body, { x, y }, false);
    }

    public update() {
        const { x, y } = this._body.velocity;
        const vec = new Phaser.Math.Vector2(x, y);
        vec.normalize();

        this._scene.matter.setVelocityX(
            this._body,
            vec.x * this._scene.enemySpeed
        );
        this._scene.matter.setVelocityY(
            this._body,
            vec.y * this._scene.enemySpeed
        );

        this._container.setPosition(
            this._body.position.x,
            this._body.position.y
        );
    }

    private createTriangle(x: number, y: number) {
        return new Phaser.GameObjects.Triangle(
            this._scene,
            x,
            y,
            0,
            -10,
            20,
            0,
            0,
            10,
            0xa0a0a0,
            1
        );
    }
}
