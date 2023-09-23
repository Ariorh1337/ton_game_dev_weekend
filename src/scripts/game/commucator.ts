interface Room {
    id: string;
    roundDuration: number; // ms number
    roomDuration: number; // ms number
    startDate: number; // ms number
}

export default class Communicator {
    static readonly server = "localhost:8080";

    constructor() {}

    public createRoom() {
        return fetch(`${Communicator.server}/new_room`, {
            method: "GET",
        })
            .then((r) => r.json())
            .then((room: Room) => {
                return room.id;
            });
    }

    public joinRoom(id: string) {
        if (id === "") {
            return {
                id: "TESTTEST",
                roundDuration: 5 * 60 * 1000, // 5 min
                roomDuration: 15 * 60 * 1000, // 15 min
                startDate: Date.now(),
            };
        }

        return fetch(`${Communicator.server}/join_room`, {
            method: "POST",
            body: JSON.stringify({ id }),
        })
            .then((r) => r.json())
            .then((room: Room) => {
                return room;
            });
    }
}
