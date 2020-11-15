import {createSlice} from "@reduxjs/toolkit";

/**
 *
 * @typedef {Object} ImageViewerState
 *  @property images: Screenshot[],
 *  @property currentImage: number | null,
 *  @property show: boolean,
 *  @property canNext: boolean
 *  @property canPrevious: boolean
 */

/**
 * @type ImageViewerState
 */
const initialState = {
  show: false,
  currentImage: null,
  canNext: false,
  canPrevious: false,
  images: []
}

const imageViewerSlice = createSlice({
  name: "imageViewer",
  initialState,
  reducers: {
    /**
     * @param {ImageViewerState} state
     * @param {Object<{images: Screenshot[], id: number}>} action.payload
     */
    show(state, action) {
      const {images, id} = action.payload;
      const currentImageIndex = images.findIndex(image => image.id === id);
      state.images = images;
      state.currentImage = images[currentImageIndex]

      state.canPrevious = Boolean(images[currentImageIndex - 1])
      state.canNext = Boolean(images[currentImageIndex + 1])
      state.show = true
    },
    next(state) {
      if (!state.canNext) return
      const currentImageIndex = state.images.findIndex(image => image.id === state.currentImage.id);
      state.currentImage = state.images[currentImageIndex + 1]

      state.canPrevious = true
      state.canNext = Boolean(state.images[currentImageIndex + 2])
    },
    previous(state) {
      if (!state.canPrevious) return
      const currentImageIndex = state.images.findIndex(image => image.id === state.currentImage.id);
      state.currentImage = state.images[currentImageIndex - 1]

      state.canPrevious = Boolean(state.images[currentImageIndex - 2])
      state.canNext = true
    },
    /**
     * @param state
     * @param {number} action.payload - id of the image
     */
    jumpTo(state, action) {
      state.currentImage = state.images.find(image => image.id === action.payload)
      const currentImageIndex = state.images.findIndex(image => image.id === action.payload);

      state.canPrevious = Boolean(state.images[currentImageIndex - 1])
      state.canNext = Boolean(state.images[currentImageIndex + 1])
    },
    hide(state) {
      state.show = false
    }
  }
})

export const {
  hide,
  show,
  previous,
  next,
  jumpTo
} = imageViewerSlice.actions
export default imageViewerSlice.reducer

export const selectShow = (state) => state.imageViewer.show
export const selectCurrentImage = (state) => state.imageViewer.currentImage
export const selectCanNext = (state) => state.imageViewer.canNext
export const selectCanPrevious = (state) => state.imageViewer.canPrevious
export const selectImages = (state) => state.imageViewer.images
