import { checkSegmentBilling } from "../../api";
import { MethodItem } from "../../models/method";
import { PackageItem } from "../../models/package";
import { STEP } from "../../utils/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PAYMENT_TYPE } from "../constant";
import * as PaymentApi from "../../api/payment";
import { setStatusFailed } from "../../state/features/asiaPaySlice";

interface PaymentSlice {
  phoneNumber: number | string;
  isLoading: boolean;
  tokenInfo: {};
  error: any;
  typeError: any | null;
  packageSelected: PackageItem | null;
  methodSelected: MethodItem | null;
  data: unknown;
  dataStatus: unknown;
  step: number;
}

const initialState: PaymentSlice = {
  phoneNumber: "",
  tokenInfo: {},
  packageSelected: null,
  methodSelected: null,
  error: null,
  typeError: null,
  isLoading: false,
  dataStatus: null,
  data: {},
  step: STEP.TERM,
};

type typeToken = {
  mobile: string;
  segment_code: string;
  code: string;
};

export const checkSegment = createAsyncThunk(
  PAYMENT_TYPE.CHECK_SEGMENT,
  async ({ mobile, segment_code, code }: typeToken) => {
    const response = await checkSegmentBilling({
      mobile,
      segment_code,
      code,
    });
    if (response.success) {
      return response.data;
    }
    return response;
  }
);
// Check Status Transaction
export const checkTransactionStatus = createAsyncThunk(
  PAYMENT_TYPE.CHECK_TRANSACTION,
  async ({ orderId }: { orderId: string }, { dispatch }) => {
    const response = await PaymentApi.checkStatusTransaction({ orderId });
    if (response.success) {
      return response;
    }
    dispatch(setStatusFailed(response));
  }
);

const paymentSlice = createSlice({
  name: PAYMENT_TYPE.NAME,
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      return { ...state, phoneNumber: action.payload };
    },
    changePhoneNumber: (state) => {
      return { ...initialState, typeError: state.typeError };
    },
    setTypeError: (state, action) => {
      return {
        ...state,
        typeError: action.payload,
      };
    },
    setPackageSelected: (state, action) => {
      return {
        ...state,
        packageSelected: action.payload,
      };
    },
    setMethodSelected: (state, action) => {
      return {
        ...state,
        methodSelected: action.payload,
      };
    },
    setStep: (state, action) => {
      return {
        ...state,
        step: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSegment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkSegment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tokenInfo = action.payload;
      })
      .addCase(checkSegment.rejected, (state) => {
        state.isLoading = false;
      })

      //Check status transaction
      .addCase(checkTransactionStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkTransactionStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataStatus = action.payload;
      })
      .addCase(checkTransactionStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setPhoneNumber,
  changePhoneNumber,
  setTypeError,
  setPackageSelected,
  setMethodSelected,
  setStep,
} = paymentSlice.actions;

export default paymentSlice.reducer;
