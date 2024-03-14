import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PaymentApi from "../../api/payment";
import { VIETTEL_PAY_TYPE } from "../constant";
import { isMobile } from "react-device-detect";

interface viettelPaySlice {
  isLoading: boolean;
  data: unknown;
  error: any;
}

const initialState: viettelPaySlice = {
  data: [],
  isLoading: false,
  error: null,
};

interface createViettelPayTransaction {
  packageId: string;
  paymentMethod: string;
  paymentService: string;
  returnUrl: string;
  cancelUrl: string;
  promotionCode: string;
}
// Create ViettelPay Transaction
export const createViettelPayTransaction = createAsyncThunk(
  VIETTEL_PAY_TYPE.CREATE_TRANSACTION,
  async (args: createViettelPayTransaction, { dispatch }) => {
    const response = await PaymentApi.createTransaction(args);
    if (response.success) {
      const redirectUrl = response?.data?.result?.pay_url || "";
      if (redirectUrl && isMobile) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);

export const viettelPaySlice = createSlice({
  name: VIETTEL_PAY_TYPE.NAME,
  initialState,
  reducers: {
    resetViettelPayData: (state) => {
      state.data = [];
      state.isLoading = false;
      state.error = null;
    },
    setStatusFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get transaction viettelpay status
      .addCase(createViettelPayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createViettelPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const { resetViettelPayData, setStatusFailed } = viettelPaySlice.actions;
export default viettelPaySlice.reducer;
