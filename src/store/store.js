import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import gamesListReducer from "./gamesListSlice"
import imageViewerReducer from "./imageViewerSlice"

const rootReducer = combineReducers({
  gamesList: gamesListReducer,
  imageViewer: imageViewerReducer
})

export const store = configureStore({
  reducer: rootReducer
})
