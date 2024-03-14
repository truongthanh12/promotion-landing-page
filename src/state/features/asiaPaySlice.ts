import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PaymentApi from "../../api/payment";
import { ASIA_PAY_TYPE } from "../constant";

interface CardInfo {
  cardNumber: string;
  cardName: string;
  cardValidDate: string;
  cardCVVCVC: string;
}
interface AsiaPaySlice {
  isLoading: boolean;
  data: unknown;
  error: any;
  infoData: CardInfo;
}

const initialState: AsiaPaySlice = {
  data: {},
  isLoading: false,
  error: null,
  infoData: {
    cardNumber: "",
    cardName: "",
    cardValidDate: "",
    cardCVVCVC: "",
  },
};

type AsiaPayType = {
  packageId: number;
  promotionCode: string;
};
// Create AsiaPay Transaction
export const createAsianPayTransaction = createAsyncThunk(
  ASIA_PAY_TYPE.CREATE_TRANSACTION,
  async (args: AsiaPayType, { dispatch }) => {
    const response: any = await PaymentApi.createAsianPayTransaction(args);
    if (response.success) {
      return response.data;
    }
    dispatch(setStatusFailed(response));
  }
);

// Check status AsiaPay Transaction
export const checkStatusAsiaPayTransaction = createAsyncThunk(
  ASIA_PAY_TYPE.GET_STATUS_TRANSACTION,
  async ({ orderId }: { orderId: string }, { dispatch }) => {
    const response = await PaymentApi.checkAsiaPayTransaction({ orderId });
    if (response.success) {
      return response.data;
    }
    dispatch(setStatusFailed(response));
  }
);

export const AsiaPaySlice = createSlice({
  name: ASIA_PAY_TYPE.NAME,
  initialState,
  reducers: {
    resetAsiaPayData: (state) => {
      state.data = {};
      state.isLoading = false;
      state.error = null;
    },
    setStatusFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setInfoData: (state, action) => {
      state.infoData = {
        ...state.infoData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create transaction AsiaPay
      .addCase(createAsianPayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAsianPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // Check status transaction AsiaPay
      .addCase(checkStatusAsiaPayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkStatusAsiaPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const { resetAsiaPayData, setStatusFailed, setInfoData } =
  AsiaPaySlice.actions;
export default AsiaPaySlice.reducer;
