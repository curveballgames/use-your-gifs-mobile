export const connectionStateReducer = (state = {connected: false}, action) => {
    const connectionState = { ...state };

    if (action.type === 'socket_connected') {
        connectionState.connected = true;
    } else if (action.type === 'socket_disconnected') {
        connectionState.connected = false;
    }

    return connectionState;
}

export const roomConnectionReducer = (state = {connectionState: 'disconnected'}, action) => {
    const newState = {...state};

    switch (action.type) {
        case 'connect_to_room':
            newState.connectionState = 'connecting';
            newState.roomCode = action.payload.roomCode;
            newState.playerName = action.payload.playerName;
            break;
        case 'player_joined':
            newState.connectionState = 'connected';
            break;
        case 'error':
            if (state.connectionState === 'connecting') {
                newState.connectionState = 'disconnected';
            }
            break;
        case 'server_disconnected':
            newState.connectionState = 'disconnected';
            newState.roomCode = null;
            newState.playerName = null;
    }

    return newState;
}

export const errorReducer = (state = {errorMessage: null}, action) => {
    if (action.type === 'error') {
        return {
            errorMessage: action.error_message
        };
    }

    return state;
}

export const gameStateReducer = (state = {previousState: null, gameState: 'lobby', hasChanged: false}, action) => {
    const newState = {
        previousState: state.gameState,
        gameState: state.gameState
    }

    if (action.type === 'trigger_start_game' && state.gameState === 'lobby') {
        newState.gameState = 'trigger_start_game';
    }

    if (action.type === 'start_game') {
        newState.gameState = 'game_starting'
    }

    if (action.type === 'error' && action.subType === 'start_game') {
        newState.gameState = 'lobby';
    }

    newState.hasChanged = newState.gameState !== newState.previousState;
    return newState;
}