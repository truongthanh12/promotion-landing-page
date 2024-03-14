import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PaymentApi from "../../api/payment";
import { ZALOPAY_TYPE } from "../constant";
import { isMobile } from "react-device-detect";
import ConfigLocalStorage from "../../utils/config/ConfigLocalStorage";
import LocalStorage from "../../utils/config/LocalStorage";
import { ApiResponse } from "../../models/ApiResponse";

interface ZalopaySlice {
  isLoading: boolean;
  data: unknown;
  error: any;
  isZaloPayLinked: boolean;
}

const initialState: ZalopaySlice = {
  data: {},
  isLoading: false,
  error: null,
  isZaloPayLinked: false,
};

interface CreateZaloPayTransaction {
  packageId: number;
  giftCode: string;
  utm_source: string;
}

// Create ZaloPay Transaction
export const createZaloPayTransaction = createAsyncThunk(
  ZALOPAY_TYPE.CREATE_TRANSACTION,
  async (args: CreateZaloPayTransaction, { dispatch }) => {
    const response: ApiResponse =
      await PaymentApi.createZaloPayTransaction(args);
    if (response?.success) {
      if (isMobile) {
        setTimeout(() => {
          window.location.href = response?.data?.deepLink;
        }, 1500);
      }
      return response.data;
    } else {
      dispatch(setStatusFailed(response));
    }
  }
);
// Check Status ZaloPay Transaction
export const checkZaloPayTransaction = createAsyncThunk(
  ZALOPAY_TYPE.CHECK_TRANSACTION,
  async ({ zlOrderId }: { zlOrderId: string }, { dispatch }) => {
    const response: ApiResponse = await PaymentApi.checkZaloPayTransaction({
      zlOrderId,
    });
    if (response.success) {
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);

// Check Link Status ZaloPay Transaction
export const checkLinkZaloPayTransaction = createAsyncThunk(
  ZALOPAY_TYPE.CHECK_TRANSACTION_LINK,
  async () => {
    const response: {
      status: number;
      data: {
        status: number;
        user_id: string;
      };
    } = await PaymentApi.checkLinkZaloPayTransaction();
    return response;
  }
);

// Create Link Status ZaloPay Transaction
export const linkZaloPayTransaction = createAsyncThunk(
  ZALOPAY_TYPE.LINK_TRANSACTION,
  async (
    {
      callbackLink,
      package_id,
      promotion_code,
      confirm,
    }: {
      callbackLink: string;
      package_id: number;
      promotion_code: string;
      confirm: number;
    },
    { dispatch }
  ) => {
    const response: ApiResponse = await PaymentApi.linkZaloPayTransaction({
      callbackLink,
      package_id,
      promotion_code,
      confirm,
    });
    if (response.success) {
      if (isMobile && response?.data?.deepLink) {
        ConfigLocalStorage.set(LocalStorage.ZL_ORDER_ID, response?.data?.txnID);
        setTimeout(() => {
          window.location.href = response?.data?.bindingQRLink;
        }, 1500);
      }
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);
export const zalopaySlice = createSlice({
  name: ZALOPAY_TYPE.NAME,
  initialState,
  reducers: {
    resetZaloPayData: (state) => {
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
      //Create zalopay transaction
      .addCase(createZaloPayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createZaloPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      //Check status zalopay transaction
      .addCase(checkZaloPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      //Check link status zalopay transaction
      .addCase(linkZaloPayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(linkZaloPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // Check status zalopay linked
      .addCase(checkLinkZaloPayTransaction.fulfilled, (state, action) => {
        state.isZaloPayLinked = action.payload?.data?.status === 1; // status === 1: linked zalopay
        state.isLoading = false;
      });
  },
});

export const { resetZaloPayData, setStatusFailed } = zalopaySlice.actions;
export default zalopaySlice.reducer;
