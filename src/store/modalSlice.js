import { createSlice } from "@reduxjs/toolkit";

/**
 * @type {"sort" | "platforms" | null}
 */
const initialState = null;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    /**
     * shows modal
     * @param state
     * @param {Object<{payload: string}>} action
     */
    show(state, action) {
      return (state = action.payload);
    },
    hide(state) {
      return (state = null);
    },
  },
});

export const { show, hide } = modalSlice.actions;
export default modalSlice.reducer;

export const selectModal = (state) => state.modal;
