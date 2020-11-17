import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGames } from "../api/rawg-api";

export const fetchGamesList = createAsyncThunk(
  "games/fetchGamesList",
  async (
    { search: searchArg, sort: sortArg, platforms: platformsArg },
    { getState },
  ) => {
    const { nextPage, search, sort, platforms } = getState().gamesList;
    return await fetchGames(
      nextPage,
      searchArg ?? search,
      sortArg ?? sort,
      platformsArg ?? platforms,
    );
  },
);

/**
 *  @typedef {Object} GamesListState
 *  @property {boolean} nextPage
 *  @property {Game[]} games
 *  @property {string} search
 *  @property {string} sort
 *  @property {Platform[]} platforms
 *  @property {"idle" | "loading" | "succeeded" | "failed"} status
 *  @property {Error | null} error
 *  @property {boolean} hasMore
 */

/**
 * @type {GamesListState}
 */
const initialState = {
  nextPage: 1,
  games: [],
  search: "",
  sort: "",
  platforms: [],
  status: "idle",
  error: null,
  hasMore: false,
};

const gamesListSlice = createSlice({
  name: "gamesList",
  initialState,
  reducers: {
    /**
     * @param {GamesListState} state
     * @param {Object<{payload: string[]}>} action
     */
    changePlatforms(state, action) {
      state.platforms = action.payload;
      state.nextPage = initialState.nextPage;
      state.status = initialState.status;
      state.games = initialState.games;
    },

    /**
     * @param {GamesListState} state
     * @param {Object<{payload: string}>} action
     */
    changeSort(state, action) {
      state.sort = action.payload;
      state.nextPage = initialState.nextPage;
      state.status = initialState.status;
      state.games = initialState.games;
    },

    /**
     * @param {GamesListState} state
     * @param {Object<{payload: string}>} action
     */
    changeSearch(state, action) {
      state.search = action.payload;
      state.nextPage = initialState.nextPage;
      state.status = initialState.status;
      state.games = initialState.games;
    },
  },
  extraReducers: {
    [fetchGamesList.pending]: (state, action) => {
      state.status = "loading";
    },

    /**
     * @param {GamesListState} state
     * @param {Object<{payload: SearchResults<Game[]>}>} action
     */
    [fetchGamesList.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.nextPage++;
      state.games.push(...action.payload.results);
      state.hasMore = action.payload.hasMore;
    },

    [fetchGamesList.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const selectGames = (state) => state.gamesList.games;
export const selectStatus = (state) => state.gamesList.status;
export const selectSearch = (state) => state.gamesList.search;
export const selectSort = (state) => state.gamesList.sort;
export const selectPlatforms = (state) => state.gamesList.platforms;
export const selectHasMore = (state) => state.gamesList.hasMore;

export const {
  changePlatforms,
  changeSearch,
  changeSort,
} = gamesListSlice.actions;
export default gamesListSlice.reducer;
