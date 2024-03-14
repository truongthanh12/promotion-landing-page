import { createSlice } from "@reduxjs/toolkit";
import { POPUP_TYPE } from "../constant";

interface PopupSlice {
  popup: string | null;
}

const initialState: PopupSlice = {
  popup: null,
};

export const popupSlice = createSlice({
  name: POPUP_TYPE.NAME,
  initialState,
  reducers: {
    setPopup: (state, action) => {
      const { name } = action.payload;
      state.popup = name;
    },
    clearPopup: (state) => {
      state.popup = null;
    },
  },
});

export const { setPopup, clearPopup } = popupSlice.actions;

export default popupSlice.reducer;
