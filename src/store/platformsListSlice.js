import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPlatforms } from "../api/rawg-api";

/**
 *  @typedef {Object} PlatformsListState
 *  @property {boolean} nextPage
 *  @property {Platform[]} platforms
 *  @property {"idle" | "loading" | "succeeded" | "failed"} status
 *  @property {Error | null} error
 *  @property {boolean} hasMore
 */

export const fetchPlatformsList = createAsyncThunk(
  "games/fetchPlatformsList",
  async ({}, { getState }) => {
    const { nextPage } = getState().platformsList;
    return await fetchPlatforms(nextPage);
  },
);

/**
 * @type PlatformsListState
 */
const initialState = {
  nextPage: 1,
  platforms: [],
  status: "idle",
  error: null,
  hasMore: false,
};

const platformsListSlice = createSlice({
  name: "platformsList",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlatformsList.pending]: (state) => {
      state.status = "loading";
    },
    /**
     *
     * @param {PlatformsListState} state
     * @param {Object<{payload: SearchResults<Platform[]>}>} action
     */
    [fetchPlatformsList.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.nextPage++;
      state.platforms.push(...action.payload.results);
      state.hasMore = action.payload.hasMore;
    },
    [fetchPlatformsList.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const selectPlatforms = (state) => state.platformsList.platforms;
export const selectStatus = (state) => state.platformsList.status;
export const selectHasMore = (state) => state.platformsList.hasMore;

export const {} = platformsListSlice.actions;
export default platformsListSlice.reducer;
