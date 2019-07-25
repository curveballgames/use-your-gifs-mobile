import { store } from "./store";

export default class Websocket {
    static WEBSOCKET_URL = 'ws://localhost:57925/client';

    socket = null;

    subscribeToStore() {
        store.subscribe(() => {this.onStoreUpdated()});
    }

    connect() {
        this.socket = new WebSocket(Websocket.WEBSOCKET_URL);

        this.socket.addEventListener('open', this.onSocketConnect.bind(this));
        this.socket.addEventListener('close', this.onSocketClose.bind(this));
        this.socket.addEventListener('message', this.onSocketEvent.bind(this));
        this.socket.addEventListener('error', this.onSocketError.bind(this));
    }

    onStoreUpdated() {
        const state = store.getState();

        if (state.roomConnectionReducer.connectionState === 'connecting') {
            this.connectToRoom(state.roomConnectionReducer.roomCode, state.roomConnectionReducer.playerName);
            return;
        }

        if (state.gameStateReducer.hasChanged && state.gameStateReducer.gameState === 'trigger_start_game') {
            this.sendStartGameEvent(state.roomConnectionReducer.roomCode);
            return;
        }
    }

    onSocketConnect(event) {
        this.dispatchToStore({
            type: 'socket_connected'
        });
    }

    onSocketClose(event) {
        this.dispatchToStore(JSON.parse(event.reason));
    }

    onSocketEvent(event) {
        console.log(event.data);
        this.dispatchToStore(JSON.parse(event.data));   
    }

    onSocketError(event) {
        this.dispatchToStore(JSON.parse(event.data));
    }

    async dispatchToStore(data) {
        console.log(data);
        store.dispatch(data);
    }

    connectToRoom(roomCode, playerName) {
        this.socket.send(JSON.stringify({
            room_code: roomCode, 
            player_name: playerName,
            type: 'new_player'
        }));
    }

    sendStartGameEvent(roomCode) {
        this.socket.send(JSON.stringify({
            room_code: roomCode,
            type: 'start_game'
        }));
    }
}