import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {fetchGames} from "../api/rawg-api";

export const fetchGamesList = createAsyncThunk(
  'games/fetchGamesList',
  async ({search: searchArg, sort: sortArg, platforms: platformsArg}, {getState}) => {
    const {currentPage, search, sort, platforms} = getState().gamesList;
    console.log(currentPage, search, sort, platforms)
    console.log(getState().gamesList)
    return await fetchGames(
      currentPage,
      searchArg ?? search,
      sortArg ?? sort,
      platformsArg ?? platforms
    )
  }
)

const initialState = {
  currentPage: 1,
  games: [],
  search: "",
  sort: "",
  platforms: [],
  status: "idle",
  error: null
}


const gamesListSlice = createSlice({
  name: 'gamesList',
  initialState,
  reducers: {
    /**
     * @param state
     * @param {Object<{payload: string[]}>} action
     */
    changePlatforms(state, action) {
      state.platforms = action.payload
      state.currentPage = initialState.currentPage
      state.status = initialState.status
      state.games = initialState.games
    },
    /**
     * @param state
     * @param {Object<{payload: string}>} action
     */
    changeSort(state, action) {
      state.sort = action.payload
      state.currentPage = initialState.currentPage
      state.status = initialState.status
      state.games = initialState.games
    },
    /**
     * @param state
     * @param {Object<{payload: string}>} action
     */
    changeSearch(state, action) {
      state.search = action.payload
      state.currentPage = initialState.currentPage
      state.status = initialState.status
      state.games = initialState.games
    }
  },
  extraReducers: {
    [fetchGamesList.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchGamesList.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentPage++
      state.games.push(...action.payload)
    },
    [fetchGamesList.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    }
  }
})

export const selectGames = (state) => state.gamesList.games
export const selectStatus = (state) => state.gamesList.status
export const selectSort = (state) => state.gamesList.sort
export const selectPlatforms = (state) => state.gamesList.platforms

export const {
  changePlatforms,
  changeSearch,
  changeSort
} = gamesListSlice.actions
export default gamesListSlice.reducer

