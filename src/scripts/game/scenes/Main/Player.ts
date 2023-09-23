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
            label: "Player",
        });
        this._right = scene.matter.add.circle(x, y + Y(0.05), this._radius, {
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            label: "Player",
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
                const bodies = [this.left, this.right];
                const walls = Object.values(scene.matter.world.walls);

                if (!bodies.includes(obj1) && !bodies.includes(obj2)) {
                    return;
                }

                if (bodies.includes(obj1) && walls.includes(obj2)) {
                    this.onWorldCollide();
                    return;
                } else if (bodies.includes(obj2) && walls.includes(obj1)) {
                    this.onWorldCollide();
                    return;
                }

                this.onObjectCollide(obj1, obj2);
            }
        );

        //

        this._left.gameObject = scene.add
            .circle(0, 0, this._radius, 0xa0a0a0, 0.2)
            .setOrigin(0.5);

        this._right.gameObject = scene.add
            .circle(0, 0, this._radius, 0xa0a0a0, 0.2)
            .setOrigin(0.5);
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

        this._left.gameObject.setPosition(
            this.left.position.x,
            this.left.position.y
        );
        this._right.gameObject.setPosition(
            this.right.position.x,
            this.right.position.y
        );
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

    public onObjectCollide = (
        obj1: MatterJS.BodyType,
        obj2: MatterJS.BodyType
    ) => {};
}
