import { Room } from "game/commucator";
import { X, Y, comm } from "game/globals";
import { msToTime } from "util/extra";
import Enemy from "./Main/Enemy";
import Food from "./Main/Food";
import Player from "./Main/Player";
import WorldBorder from "./Main/WorldBorder";

export default class Main extends Phaser.Scene {
    private _room: Room;
    private _rnd: Phaser.Math.RandomDataGenerator;
    private _score: number;

    private _player: Player;
    private _food: Food;
    private _enemys: Enemy[];

    constructor() {
        super({ key: "Main" });
    }

    get enemySpeed() {
        return 2 - this._enemys.length / 100;
    }

    public init(room: Room) {
        this._room = room;
        this._rnd = new Phaser.Math.RandomDataGenerator([room.id]);
        this._score = 0;
        this._enemys = [];

        //

        this.matter.world.setBounds();
        this.matter.world.setGravity(0, 0, 0);

        this.scene.get("TopBar").scene.sleep();
    }

    public create() {
        this.createScore();
        this.createTimer();

        this._player = new Player(this, X(0.5), Y(0.5));
        this._player.onWorldCollide = () => this.endGame();

        new WorldBorder(this);

        this._food = new Food(this);
        this._player.onObjectCollide = (obj1, obj2) => {
            if (obj1 === this._food.body || obj2 === this._food.body) {
                this._score++;
                this.events.emit("score-update");

                this._player.immune();

                const enemy = new Enemy(this);
                enemy.move(this._food.body.position);

                this._enemys.push(enemy);
                this._food.move();

                comm.incrementScore(this._room);

                return;
            }

            if (obj1.label === "Enemy" || obj2.label === "Enemy") {
                this.endGame();
            }
        };
    }

    public update() {
        this._player.update();
        this._food.update();
        this._enemys.forEach((enemy) => enemy.update());
    }

    public getFoodPosition() {
        const x = this._rnd.between(1, 9);
        const y = this._rnd.between(1, 9);

        return { x: X(x / 10), y: Y(y / 10) };
    }

    private createScore() {
        const text = this.add
            .text(X(0.5), Y(0.8), String(this._score), {
                fontSize: "124px",
                fontFamily: "uni-sans-heavy",
                color: "#303030",
            })
            .setOrigin(0.5, 0.5);

        this.events.on("score-update", () => {
            if (text && text.visible) text.setText(String(this._score));
        });
    }

    private createTimer() {
        const endTime =
            this._room.roundStartDate * 1000 + this._room.roundDuration;

        const text = this.add
            .text(X(0.5), Y(0.2), msToTime(endTime - Date.now()), {
                fontSize: "124px",
                fontFamily: "uni-sans-heavy",
                color: "#303030",
            })
            .setOrigin(0.5, 0.5);

        this.tweens.addCounter({
            duration: 500,
            repeat: -1,
            onRepeat: () => {
                if (endTime - Date.now() <= 0) {
                    this.endGame();
                    return;
                }

                text.setText(msToTime(endTime - Date.now()));
            },
        });
    }

    private endGame() {
        this.scene.get("TopBar").scene.wake();
        this.scene.start("End", {
            room: this._room,
            score: this._score,
        });
    }
}
