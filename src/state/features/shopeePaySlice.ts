import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PaymentApi from "../../api/payment";
import { SHOPEEPAY_TYPE } from "../constant";
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_BE,
  RETURN_URL,
} from "../../utils/constants";
import { ApiResponse } from "../../models/ApiResponse";

interface ShopeePaySlice {
  isLoading: boolean;
  data: unknown;
  error: any;
}

const initialState: ShopeePaySlice = {
  data: {},
  isLoading: false,
  error: null,
};

interface CreateShopeePayTransaction {
  packageId: string;
  promotionCode: string;
}

// Create ShopeePay Transaction
export const createShopeePayTransaction = createAsyncThunk(
  SHOPEEPAY_TYPE.CREATE_TRANSACTION,
  async (args: CreateShopeePayTransaction, { dispatch }) => {
    const response: ApiResponse =
      await PaymentApi.createShopeePayTransaction(args);
    if (!response?.success && !response?.data?.orderId) {
      return dispatch(setStatusFailed(response));
    }
    return dispatch(
      getInfoTransaction({
        orderId: response.data.orderId,
        returnUrl:
          RETURN_URL +
          PAYMENT_METHOD.SHOPEE_PAY +
          `orderId=${response.data.orderId}`,
      })
    );
  }
);

export const getInfoTransaction = createAsyncThunk(
  SHOPEEPAY_TYPE.GET_STATUS_TRANSACTION,
  async (
    { orderId, returnUrl }: { orderId: string; returnUrl: string },
    { dispatch }
  ) => {
    const response = await PaymentApi.getInfoTransaction({
      orderId,
      returnUrl,
    });
    if (response.success) {
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);

// Check Link Status ShopeePay Transaction Recurring
export const checkStatusTokenSaved = createAsyncThunk(
  SHOPEEPAY_TYPE.CHECK_TRANSACTION_LINK,
  async (
    {
      paymentMethod = PAYMENT_METHOD_BE.WALLET,
      paymentService = PAYMENT_METHOD.SHOPEE_PAY,
    }: { paymentMethod: string; paymentService: string },
    { dispatch }
  ) => {
    const response = await PaymentApi.checkStatusTokenSaved({
      paymentMethod,
      paymentService,
    });
    if (response.success) {
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);

// Create Link Status ShopeePay Transaction
export const linkShopeePayTransaction = createAsyncThunk(
  SHOPEEPAY_TYPE.LINK_TRANSACTION,
  async (_, { dispatch }) => {
    const response = await PaymentApi.checkTokenLinkShopeePayTransaction();
    if (response.success) {
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);

// Create Check Status ShopeePay Transaction
export const checkStatusShopeePayTransaction = createAsyncThunk(
  SHOPEEPAY_TYPE.CHECK_TRANSACTION,
  async (
    {
      orderId,
    }: {
      orderId: string;
    },
    { dispatch }
  ) => {
    const response = await PaymentApi.checkStatusShopeePayTransaction({
      orderId,
    });
    if (response.success) {
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);

export const shopeePaySlice = createSlice({
  name: SHOPEEPAY_TYPE.NAME,
  initialState,
  reducers: {
    resetShopeePayData: (state) => {
      state.data = {};
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
      //Create transaction shopee pay transaction
      .addCase(createShopeePayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShopeePayTransaction.fulfilled, (state) => {
        state.isLoading = false;
      })
      //Get info shopee pay transaction
      .addCase(getInfoTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfoTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      //Check status shopee pay transaction
      .addCase(checkStatusShopeePayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      //Check link status shopee pay transaction
      .addCase(linkShopeePayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(linkShopeePayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

export const { resetShopeePayData, setStatusFailed } = shopeePaySlice.actions;
export default shopeePaySlice.reducer;
