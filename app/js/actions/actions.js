export function connectToRoomAction(payload) {
    return {
        type: 'connect_to_room',
        payload
    }
}

export function startGameEvent(payload) {
    return {
        type: 'trigger_start_game',
        payload
    }
}