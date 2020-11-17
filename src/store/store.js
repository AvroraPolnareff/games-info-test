import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import gamesListReducer from "./gamesListSlice";
import imageViewerReducer from "./imageViewerSlice";
import platformsListReducer from "./platformsListSlice";
import modalReducer from "./modalSlice";

const rootReducer = combineReducers({
  gamesList: gamesListReducer,
  imageViewer: imageViewerReducer,
  platformsList: platformsListReducer,
  modal: modalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
