import { Room } from "game/commucator";
import { X, Y } from "game/globals";
import Player from "./Main/Player";

export default class Main extends Phaser.Scene {
    private room: Room;
    private rnd: Phaser.Math.RandomDataGenerator;

    private player: Player;

    constructor() {
        super({ key: "Main" });
    }

    public init(room: Room) {
        this.room = room;
        this.rnd = new Phaser.Math.RandomDataGenerator([room.id]);

        //

        this.matter.world.setBounds();
        this.matter.world.setGravity(0, 0, 0);
    }

    public create() {
        this.player = new Player(this, X(0.5), Y(0.5));
        this.player.onWorldCollide = () => this.endGame();
    }

    public update() {
        this.player.update();
    }

    private endGame() {
        this.scene.start("End");
    }
}
