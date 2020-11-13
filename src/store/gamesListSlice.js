import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {fetchGames} from "../api/rawg-api";

export const fetchGamesList = createAsyncThunk(
  'games/fetchGamesList',
  async (getState) => {
    const {page, search, sort, platforms} = getState();
    return await fetchGames(page, search, sort, platforms)
  }
)

const initialState = {
  currentPage: 0,
  games: [],
  search: "",
  sortBy: "",
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
      state.currentPage = 0
      state.status = "idle"
      state.games = []
    },
    /**
     * @param state
     * @param {Object<{payload: string}>} action
     */
    changeSort(state, action) {
      state.sort = action.payload
      state.currentPage = 0
      state.status = "idle"
      state.games = []
    },
    /**
     * @param state
     * @param {Object<{payload: string}>} action
     */
    changeSearch(state, action) {
      state.sort = action.payload
      state.currentPage = 0
      state.status = "idle"
      state.games = []
    }
  },
  extraReducers: {
    [fetchGamesList.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchGamesList.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentPage++
      state.games.push(...action)
    },
    [fetchGamesList.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    }
  }
})

export const selectGames = (state) => state.games
export const selectStatus = (state) => state.status
export const selectSort = (state) => state.sort

export const {
  changePlatforms,
  changeSearch,
  changeSort
} = gamesListSlice.actions
export default gamesListSlice.reducer

