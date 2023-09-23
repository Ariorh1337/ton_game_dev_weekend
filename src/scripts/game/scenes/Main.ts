import { X, Y } from "game/globals";

export default class Main extends Phaser.Scene {
    private left: MatterJS.BodyType;
    private right: MatterJS.BodyType;
    private current: MatterJS.BodyType;

    private velocity = 5;

    constructor() {
        super({ key: "Main" });
    }

    public init(...asd) {
        console.log(asd);
    }

    public create() {
        this.matter.world.setBounds();

        this.matter.world.setGravity(0, 0, 0);

        //  Some different joint types
        this.left = this.matter.add.circle(X(0.5), Y(0.45), 32, {
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
        });
        this.right = this.matter.add.circle(X(0.5), Y(0.55), 32, {
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
        });
        this.current = this.right;

        this.matter.body.setStatic(this.left, true);
        this.matter.body.setStatic(this.right, false);

        //  A spring, because length > 0 and stiffness < 0.9
        this.matter.add.spring(this.left, this.right, 140, 1);

        this.input.on("pointerdown", () => {
            const { current, based } = this.getBalls();

            this.matter.body.update(current, 1);
            this.matter.body.update(based, 1);

            this.matter.body.setStatic(current, true);
            this.matter.body.setStatic(based, false);
            this.current = based;

            this.velocity = -this.velocity;
        });

        this.matter.world.on(
            Phaser.Physics.Matter.Events.COLLISION_START,
            (data, obj1, obj2) => {
                if (obj1 === this.left || obj1 === this.right) {
                    this.endGame();
                } else if (obj2 === this.left || obj2 === this.right) {
                    this.endGame();
                }
            }
        );

        // ####
        (window as any).test = { left: this.left, right: this.right };
        (window as any).scene = this;
    }

    public update() {
        const { current, based } = this.getBalls();

        if (current.position.y > based.position.y) {
            this.matter.setVelocityX(current, this.velocity);
        } else {
            this.matter.setVelocityX(current, -this.velocity);
        }

        if (current.position.x > based.position.x) {
            this.matter.setVelocityY(current, -this.velocity);
        } else {
            this.matter.setVelocityY(current, this.velocity);
        }
    }

    private endGame() {
        this.scene.start("End");
    }

    private getBalls() {
        const current = this.current;
        const based = current === this.left ? this.right : this.left;

        return { current, based };
    }
}
