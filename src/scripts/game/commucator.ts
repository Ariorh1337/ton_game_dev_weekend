import { wallet } from "./globals";

export interface Room {
    id: string;
    shortId: string;
    roundDuration: number; // ms number - 5m
    roomDuration: number; // ms number - 15m
    roundStartDate: number; // ms number
    roomStartDate: number; // ms number
}

export default class Communicator {
    static readonly server = "localhost:4000";
    static telegram = window.location.hash.replace("#", "");

    constructor() {
        // @ts-ignore
        const search = new URLSearchParams(window.Telegram.WebApp.initData);
        const user = JSON.parse(search.get("user") || "{}");

        Communicator.telegram = user.id;
    }

    public createRoom() {
        const server = Communicator.server;
        const telegram = Communicator.telegram;

        // TODO add money charge

        return fetch(`${server}/api/v2/room`, {
            method: "POST",
            body: JSON.stringify({ wallet: wallet.adress, telegram }),
        })
            .then((r) => r.json())
            .then((room: Room) => {
                return room.shortId;
            });
    }

    public joinRoom(room_id: string) {
        const server = Communicator.server;
        const telegram = Communicator.telegram;

        // TODO this is for testing
        // TODO remove possibility to join if id === ""
        if (room_id === "") {
            return {
                id: "TESTTEST",
                roundDuration: 5 * 60 * 1000, // 5 min
                roomDuration: 15 * 60 * 1000, // 15 min
                roundStartDate: Date.now(),
                roomStartDate: Date.now(),
            };
        }

        return fetch(`${server}/api/v2/room/join`, {
            method: "POST",
            body: JSON.stringify({ room_id, wallet: wallet.adress, telegram }),
        })
            .then((r) => r.json())
            .then((room: Room) => {
                return room;
            });
    }

    public incrementScore(room: Room) {
        const server = Communicator.server;
        const telegram = Communicator.telegram;

        if (telegram === "TEST_FOR_NOW") {
            return null;
        }

        return fetch(`${server}/api/v2/room/increment`, {
            method: "POST",
            body: JSON.stringify({
                room_id: room.id,
                wallet: wallet.adress,
                telegram,
            }),
        });
    }

    public async getBalance(wallet: string) {
        return fetch(
            `https://toncenter.com/api/v2/getAddressBalance?address=${wallet}`
        )
            .then((r) => r.json())
            .then((responce) => {
                return responce.result;
            });
    }
}
