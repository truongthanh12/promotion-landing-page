import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as PaymentApi from "../../api/payment";
import { VNPAY_TYPE } from "../constant";
import { isMobile } from "react-device-detect";

type VNPayBankItem = {
  name: string;
  logo: string;
  code: string;
  id: number;
};
interface VNPaySlice {
  isLoading: boolean;
  data: unknown;
  dataStatus: unknown;
  error: any;
  bankSelected: VNPayBankItem | null;
}

const initialState: VNPaySlice = {
  data: [],
  dataStatus: null,
  isLoading: false,
  error: null,
  bankSelected: null,
};

type VNPayType = {
  packageId: number;
  promotionCode: string;
  bankCode: string;
};
// Create VNPAY Transaction
export const createVNPayTransaction = createAsyncThunk(
  VNPAY_TYPE.CREATE_TRANSACTION,
  async (args: VNPayType, { dispatch }) => {
    const response = await PaymentApi.createVnPayTransaction(args);
    if (response.success) {
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);
// Create VNPAY Transaction By GateWay
export const createVNPayTransactionByGateway = createAsyncThunk(
  VNPAY_TYPE.CREATE_TRANSACTION,
  async (args: VNPayType, { dispatch }) => {
    const response = await PaymentApi.createVnPayTransactionByGateway(args);
    if (response.success) {
      if (isMobile) {
        const redirectUrl = response?.data?.payUrl || "";
        if (redirectUrl) {
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 1000);
        }
      }
      return response.data;
    }
    return dispatch(setStatusFailed(response));
  }
);

// Check status VNPAY Transaction
export const checkStatusVNPayTransaction = createAsyncThunk(
  VNPAY_TYPE.GET_STATUS_TRANSACTION,
  async ({ orderId }: { orderId: string }, { dispatch }) => {
    const response = await PaymentApi.checkVnPayTransaction({ orderId });
    if (response.success) {
      return response;
    }
    return dispatch(setStatusFailed(response));
  }
);

export const VNPaySlice = createSlice({
  name: VNPAY_TYPE.NAME,
  initialState,
  reducers: {
    resetVNPayData: (state) => {
      state.data = [];
      state.dataStatus = null;
      state.isLoading = false;
      state.error = null;
    },
    selectedBank: (state, action) => {
      state.bankSelected = action.payload;
      state.isLoading = false;
    },
    setStatusFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create transaction VNPAY QR
      .addCase(createVNPayTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVNPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      // Check status VNPAY Transaction
      .addCase(checkStatusVNPayTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataStatus = action.payload;
      });
  },
});

export const { resetVNPayData, setStatusFailed, selectedBank } =
  VNPaySlice.actions;
export default VNPaySlice.reducer;
