import { Room } from "game/commucator";
import { X, Y } from "game/globals";
import Food from "./Main/Food";
import Player from "./Main/Player";
import WorldBorder from "./Main/WorldBorder";

export default class Main extends Phaser.Scene {
    private _room: Room;
    private _foodRND: Phaser.Math.RandomDataGenerator;
    private _score: number = 0;

    private _player: Player;
    private _food: Food;

    constructor() {
        super({ key: "Main" });
    }

    public init(room: Room) {
        this._room = room;
        this._foodRND = new Phaser.Math.RandomDataGenerator([
            room.id + "_food",
        ]);

        //

        this.matter.world.setBounds();
        this.matter.world.setGravity(0, 0, 0);
    }

    public create() {
        this.createScore();

        this._player = new Player(this, X(0.5), Y(0.5));
        this._player.onWorldCollide = () => this.endGame();

        new WorldBorder(this);

        this._food = new Food(this);
        this._player.onObjectCollide = (obj1, obj2) => {
            if (obj1 === this._food.body || obj2 === this._food.body) {
                this._score++;
                this.events.emit("score-update");

                this._food.move();
            }
        };
    }

    public update() {
        this._player.update();
        this._food.update();
    }

    public getFoodPosition() {
        const x = this._foodRND.between(1, 9);
        const y = this._foodRND.between(1, 9);

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
            text.setText(String(this._score));
        });
    }

    private endGame() {
        this.scene.start("End");
    }
}
