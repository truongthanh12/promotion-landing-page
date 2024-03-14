import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PaymentApi from "../../api/payment";
import { MOMO_TYPE } from "../constant";
import { PAYMENT_METHOD, RETURN_URL } from "../../utils/constants";

interface momoSlice {
  isLoading: boolean;
  data: unknown;
  error: any;
}

const initialState: momoSlice = {
  data: [],
  isLoading: false,
  error: null,
};

interface createMomoTransaction {
  packageId: string;
  tokenId: string;
  paymentMethod: string;
  paymentService: string;
  promotionCode: string;
}
// Create Momo Transaction
export const createMomoTransaction = createAsyncThunk(
  MOMO_TYPE.CREATE_TRANSACTION,
  async (args: createMomoTransaction, { dispatch }) => {
    const response = await PaymentApi.createTransaction(args);
    if (response.success) {
      dispatch(
        getInfoTransaction({
          orderId: response.data.result.order_id,
          returnUrl: RETURN_URL + PAYMENT_METHOD.MOMO,
        })
      );
    } else {
      dispatch(setStatusFailed(response));
    }
  }
);

// Get transaction momo status
export const getInfoTransaction = createAsyncThunk(
  MOMO_TYPE.GET_STATUS_TRANSACTION,
  async (
    { orderId, returnUrl }: { orderId: string; returnUrl: string },
    { dispatch }
  ) => {
    const response: any = await PaymentApi.getInfoTransaction({
      orderId,
      returnUrl,
    });
    if (response.success) {
      const redirectUrl = response?.data?.redirectUrl || "";
      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1000);
      }
    } else {
      dispatch(setStatusFailed(response));
    }
  }
);

export const momoSlice = createSlice({
  name: MOMO_TYPE.NAME,
  initialState,
  reducers: {
    resetMomoData: (state) => {
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
      // Get transaction momo status
      .addCase(createMomoTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMomoTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // Create transaction momo status
      .addCase(getInfoTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfoTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const { resetMomoData, setStatusFailed } = momoSlice.actions;
export default momoSlice.reducer;
