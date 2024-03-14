import { ERROR_TYPE, TEXT } from "../utils/constants";
import { format, parseISO } from "date-fns";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction, Dispatch } from "redux";
import { getCampaignConfig } from "../state/features/campaignSlice";
import { setTypeError } from "../state/features/paymentSlice";
import { trimmedPathname } from "../utils/helper";
import { isMobile } from "react-device-detect";

export interface ITransaction {
  order_id: string;
  appId: number;
  deep_link: string;
  errorCode: number;
  localMessage: string;
  message: string;
  orderId: string;
  qrCodeImg: string;
  qrDisplayTime: string;
  zpTransToken: string;
  binding_qr_link: string;
  binding_token: string;
  binding_url: string;
  short_link: string;
  txnID: string;
}

export interface IResultTransaction {
  amount: string;
  display_duration: string;
  error_code: string | number;
  error_string: string;
  expiry_date: string;
  message: string;
  package_duration: number;
  package_group_id: number;
  package_id: number;
  package_name: string;
  recurring: number;
  status: number;
  txn_ref: string;
  effectiveDate: string;
  txn_owner_id: string;
}

export const ResultTransaction = ({ data }: { data: IResultTransaction }) => {
  let expiryDateFormatted = TEXT.WHEN_YOU_CANCEL;

  if (!data.recurring && data.expiry_date) {
    expiryDateFormatted = format(parseISO(data.expiry_date), "dd/MM/yyyy");
  }
  if (data)
    return {
      amount: data.amount,
      errorCode: data.error_code,
      errorString: data.error_string,
      expiryDate: expiryDateFormatted,
      message: data.error_string || data.message,
      packageDuration: data.package_duration,
      displayDuration: data.display_duration,
      packageId: data.package_group_id,
      termId: data.package_id,
      packageName: data.package_name,
      nextPaymentTerm:
        data.recurring && format(parseISO(data.expiry_date), "dd/MM/yyyy"),
      status: data.status,
      txnRef: data.txn_ref,
      recurring: data.recurring === 1,
      txnOwnerId: data.txn_owner_id,
      effectiveDate: format(new Date(), "dd/MM/yyyy"),
    };
};

export const Transaction = ({ data }: { data: ITransaction }) => {
  if (data)
    return {
      appId: data.appId,
      deepLink: data.deep_link,
      errorCode: data.errorCode,
      localMessage: data.localMessage,
      message: data.message,
      orderId: data.orderId || data.order_id,
      qrCodeImg: data.qrCodeImg,
      qrDisplayTime: data.qrDisplayTime,
      zpTransToken: data.zpTransToken,
      bindingQRLink: data.binding_qr_link,
      bindingToken: data.binding_token,
      bindingUrl: data.binding_url,
      shortLink: data.short_link,
      txnID: data.txnID,
    };
};
export const checkStatusExpriedCampaign = async (
  dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>,
  endExpried?: string
) => {
  let dataConfig: any = {};
  if (!endExpried || isMobile) {
    dataConfig = await dispatch(getCampaignConfig({ key: trimmedPathname }));
  }
  const timeEndExpried = Date.parse(endExpried || dataConfig?.payload?.end_at);
  const currentTime = new Date().getTime();
  if (timeEndExpried < currentTime) {
    dispatch(setTypeError(ERROR_TYPE.ENDED));
    return true;
  }
  return false;
};
