import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import gamesListReducer from "./gamesListSlice"

const rootReducer = combineReducers({
  gamesList: gamesListReducer
})

export const store = configureStore({
  reducer: rootReducer
})
