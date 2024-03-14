import { createSlice } from "@reduxjs/toolkit";
import { APP } from "../constant";

interface AppSlice {
  isLoadingData: boolean;
}

const initialState: AppSlice = {
  isLoadingData: false,
};

export const appSlice = createSlice({
  name: APP.name,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        isLoadingData: action.payload,
      };
    },
  },
});

export const { setLoading } = appSlice.actions;
export default appSlice.reducer;
