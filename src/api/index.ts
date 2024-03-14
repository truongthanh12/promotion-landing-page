import { isMobile } from "react-device-detect";
import apiService from "./apiService";
import { API } from "./const";
import { PLATFORM } from "../utils/constants";
import { ApiResponse } from "../models/ApiResponse";

export const checkSegmentBilling = async ({
  mobile,
  segment_code,
  code,
}: {
  mobile: string;
  segment_code: string;
  code: string;
}) => {
  const response: ApiResponse = await apiService.post(
    API.CHECK_SEGMENT_BILLING,
    {
      mobile,
      segment_code,
      code,
    }
  );
  return { ...response, data: response.data };
};

export const getConfigCampaign = async ({ key }: { key: string }) => {
  const params = {
    platform: process.env.REACT_APP_CAMPAIGN_PLATFORM,
  };
  const response: ApiResponse = await apiService.get(API.GET_CONFIG(key), {
    params,
  });
  let data = null;
  if (response.success && response?.data?.data?.type === "json") {
    data = JSON.parse(response.data.data.value);
  }
  return { ...response, data };
};

export const getPackages = async () => {
  const params = {
    platform: process.env.REACT_APP_CAMPAIGN_PLATFORM,
  };
  const response: ApiResponse = await apiService.get(API.GET_PACKAGES, {
    params,
  });

  return { ...response, data: response.data };
};

// PAYMENT V2
type typePaymentMethod = {
  paymentMethod: string;
  packageId: string;
  promotionCode: string;
  tokenId: string;
  paymentService: string;
  redirectUri: string;
  returnUrl: string;
  cancelUrl: string;
};
export const createTransaction = async ({
  paymentMethod,
  packageId,
  promotionCode,
  tokenId,
  paymentService,
  redirectUri,
  returnUrl,
  cancelUrl,
}: typePaymentMethod) => {
  const response = await apiService.post(API.CREATE_TRANSACTION, {
    paymentMethod,
    packageId,
    promotionCode,
    tokenId,
    paymentService,
    redirectUri,
    returnUrl,
    cancelUrl,
  });
  return { ...response, data: response.data };
};

export const getInfoTransaction = async ({
  orderId,
  returnUrl,
}: {
  orderId: string;
  returnUrl: string;
}) => {
  const response = await apiService.post(API.GET_INFO_TRANSACTION, {
    orderId,
    returnUrl,
  });
  return { ...response, data: response.data };
};

type typeResultTransaction = {
  data: any;
  checksum: string;
  orderId: string;
  paymentMethod: string;
  paymentService: string;
  state: string;
  code: string;
  error: string;
  errorDescription: string;
  redirectUri: string;
  vpOrderId: string;
  errorCodeVp: string;
  merchantCodeVp: string;
  paymentStatusVp: string;
  transAmountVp: string;
  checkSumVp: string;
  billCodeVp: string;
  custMsisdnVp: string;
};
export const getResultTransaction = async ({
  data,
  checksum,
  orderId,
  paymentMethod,
  paymentService,
  state,
  code,
  error,
  errorDescription,
  redirectUri,
  vpOrderId,
  errorCodeVp,
  merchantCodeVp,
  paymentStatusVp,
  transAmountVp,
  checkSumVp,
  billCodeVp,
  custMsisdnVp,
}: typeResultTransaction) => {
  let params = null;
  if (vpOrderId) {
    params = {
      payment_method: paymentMethod,
      order_id: vpOrderId,
      result: {
        error_code: errorCodeVp,
        merchant_code: merchantCodeVp,
        order_id: vpOrderId,
        payment_status: paymentStatusVp,
        trans_amount: transAmountVp,
        check_sum: checkSumVp,
        billcode: billCodeVp,
        cust_msisdn: custMsisdnVp,
      },
    };
  } else if (orderId) {
    params = {
      payment_method: paymentMethod,
      order_id: orderId,
      result: {
        data,
        checksum,
      },
    };
  } else if (state) {
    params = {
      platform: isMobile ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
      payment_method: paymentMethod,
      payment_service: paymentService,
      result: {
        data: {
          state,
          redirect_uri: redirectUri,
          code: code || undefined,
          error: error || undefined,
          error_description: errorDescription || undefined,
        },
      },
    };
  }
  const response = await apiService.post(
    API.GET_RESULT_TRANSACTION(orderId),
    params
  );
  return { ...response, data: response.data };
};

export const getStatusTransaction = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const response = await apiService.get(API.GET_STATUS_TRANSACTION(orderId), {
    params: { orderId },
  });
  return { ...response, data: response.data };
};

export const getVNPayList = async () => {
  const response = await apiService.get(API.GET_VNPAY_LIST);
  return { ...response, data: response.data };
};
