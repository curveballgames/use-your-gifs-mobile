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

export function clearError() {
    return {
        type: 'clear_error'
    }
}

export function submitPrompt(payload) {
    return {
        type: 'submit_prompt',
        payload
    }
}