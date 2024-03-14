import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import paymentSlice from "./features/paymentSlice";
import popupSlice from "./features/popupSlice";
import packageSlice from "./features/packageSlice";
import zalopaySlice from "./features/zalopaySlice";
import momoSlice from "./features/momoSlice";
import vnpaySlice from "./features/vnpaySlice";
import viettelPaySlice from "./features/viettelPaySlice";
import shopeePaySlice from "./features/shopeePaySlice";
import asiaPaySlice from "./features/asiaPaySlice";
import campaignSlice from "./features/campaignSlice";
import appSlice from "../state/features/appSlice";

const rootReducer: Reducer = combineReducers({
  app: appSlice,
  popup: popupSlice,
  payment: paymentSlice,
  campaign: campaignSlice,
  packages: packageSlice,
  zalopay: zalopaySlice,
  momo: momoSlice,
  vnpay: vnpaySlice,
  viettelpay: viettelPaySlice,
  shopeepay: shopeePaySlice,
  asiapay: asiaPaySlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools:
    process.env.REACT_APP_NODE_ENV === "dev" ||
    process.env.REACT_APP_NODE_ENV === "testing",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
