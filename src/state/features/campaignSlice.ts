import { getConfigCampaign } from "../../api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CAMPAIGN_TYPE } from "../constant";
import { setTypeError } from "../../state/features/paymentSlice";
import { ERROR_TYPE } from "../../utils/constants";

interface CompaignSlice {
  data: unknown;
  isLoading: boolean;
}

const initialState: CompaignSlice = {
  data: "",
  isLoading: false,
};

export const getCampaignConfig = createAsyncThunk(
  CAMPAIGN_TYPE.GET_CONFIG,
  async ({ key }: { key: string }, { dispatch }) => {
    const response = await getConfigCampaign({ key });
    if (response.success && response.data) {
      return response.data;
    } else {
      dispatch(setTypeError(ERROR_TYPE.ENDED));
    }
  }
);

const compaignSlice = createSlice({
  name: CAMPAIGN_TYPE.NAME,
  initialState,
  reducers: {
    setCompaignConfig: (state, action) => {
      return { ...state, data: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampaignConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCampaignConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCampaignConfig.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCompaignConfig } = compaignSlice.actions;

export default compaignSlice.reducer;
