import { Y } from "game/globals";
import Main from "../Main";

export default class Player {
    private _radius = 32;
    private _velocity = 5;

    private _scene: Main;

    private _left: MatterJS.BodyType;
    private _right: MatterJS.BodyType;
    private _current: MatterJS.BodyType;

    constructor(scene: Main, x: number, y: number) {
        this._scene = scene;

        this._left = scene.matter.add.circle(x, y - Y(0.05), this._radius, {
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
        });
        this._right = scene.matter.add.circle(x, y + Y(0.05), this._radius, {
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
        });
        this._current = this._right;

        scene.matter.body.setStatic(this._left, true);
        scene.matter.body.setStatic(this._right, false);

        scene.matter.add.spring(this.left, this.right, 140, 1);

        scene.input.on("pointerdown", () => this.reverse());

        //

        scene.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (data, obj1, obj2) => {
                if (obj1 === this.left || obj1 === this.right) {
                    this.onWorldCollide();
                } else if (obj2 === this.left || obj2 === this.right) {
                    this.onWorldCollide();
                }
            }
        );
    }

    public get left() {
        return this._left;
    }

    public get right() {
        return this._right;
    }

    public get current() {
        return this._current;
    }

    public get pinned() {
        const current = this.current;
        const pinned = current === this.left ? this.right : this.left;

        return pinned;
    }

    public update() {
        const { current, pinned } = this;

        if (current.position.y > pinned.position.y) {
            this._scene.matter.setVelocityX(current, this._velocity);
        } else {
            this._scene.matter.setVelocityX(current, -this._velocity);
        }

        if (current.position.x > pinned.position.x) {
            this._scene.matter.setVelocityY(current, -this._velocity);
        } else {
            this._scene.matter.setVelocityY(current, this._velocity);
        }
    }

    public reverse() {
        const { current, pinned } = this;

        this._scene.matter.body.update(current, 1);
        this._scene.matter.body.update(pinned, 1);

        this._scene.matter.body.setStatic(current, true);
        this._scene.matter.body.setStatic(pinned, false);
        this._current = pinned;

        this._velocity = -this._velocity;
    }

    public onWorldCollide = () => {};
}
