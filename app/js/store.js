import { combineReducers, createStore } from 'redux'
import { roomConnectionReducer, connectionStateReducer, errorReducer, gameStateReducer } from "./reducers.js";

export const store = createStore(combineReducers({
    roomConnectionReducer, connectionStateReducer, errorReducer, gameStateReducer
}))