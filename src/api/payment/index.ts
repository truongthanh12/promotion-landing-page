import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_BE,
  PLATFORM,
  RETURN_URL,
} from "../../utils/constants";
import ApiService from "../apiService";
import { API } from "../const";
import {
  IResultTransaction,
  ITransaction,
  ResultTransaction,
  Transaction,
} from "../../models/Transaction";
import { mobileCheck } from "../../utils/helper";
import { ApiResponse } from "../../models/ApiResponse";

export const createZaloPayTransaction = async ({
  packageId,
  giftCode,
  utm_source = "",
}: {
  packageId: number;
  giftCode: string;
  utm_source: string;
}) => {
  const params = {
    package_id: packageId,
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
    promotion_code: giftCode || "",
    callback_url: RETURN_URL + PAYMENT_METHOD.ZALO_PAY,
    utm_source,
  };
  const config = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  const response: ApiResponse = await ApiService.post(
    API.CREATE_TRANSACTION_ZALOPAY,
    params,
    config
  );
  const data: ITransaction = response?.data;
  const result = Transaction({ data });
  return { ...response, data: result };
};
export const createShopeePayTransaction = async ({
  packageId,
  promotionCode,
}: {
  packageId: string;
  promotionCode: string;
}) => {
  const params = {
    package_id: packageId,
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
    payment_method: PAYMENT_METHOD_BE.WALLET,
    payment_service: PAYMENT_METHOD.SHOPEE_PAY,
    tokenId: "",
    promotion_code: promotionCode,
  };
  const response: ApiResponse = await ApiService.post(
    API.CREATE_TRANSACTION,
    params
  );
  const data: ITransaction = response?.data?.result || null;
  const result = Transaction({ data });
  return { ...response, data: result };
};
export const checkStatusTransaction = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const response: ApiResponse = await ApiService.get(
    API.GET_STATUS_TRANSACTION(orderId)
  );
  const data: IResultTransaction = response.data.result;
  const result = ResultTransaction({ data });
  return { ...response, data: result };
};

export const checkZaloPayTransaction = async ({
  zlOrderId,
}: {
  zlOrderId: string;
}) => {
  const response: ApiResponse = await ApiService.get(
    API.CHECK_ZALOPAY_TRANSACTION(zlOrderId)
  );
  const data: IResultTransaction = response?.data;
  const result = ResultTransaction({ data });
  return { ...response, data: result };
};

export const checkLinkZaloPayTransaction = async () => {
  const response = await ApiService.get(
    API.CHECK_LINK_ZALOPAY_TRANSACTION(
      Math.floor(Math.random() * Math.floor(99999))
    )
  );
  return { ...response, data: response?.data };
};

export const checkTokenLinkShopeePayTransaction = async () => {
  const params = {
    payment_method: PAYMENT_METHOD_BE.WALLET,
    payment_service: PAYMENT_METHOD.SHOPEE_PAY,
    return_url: RETURN_URL + PAYMENT_METHOD.SHOPEE_PAY,
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
  };
  const response: ApiResponse = await ApiService.post(
    API.GET_LINK_TOKEN,
    params
  );
  const data = response?.data?.result || {};
  const result = {
    qrCodeImg: data.qr_code_img,
    redirectUrl: data.redirect_url,
  };
  return { ...response, data: result };
};

export const checkStatusShopeePayTransaction = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const response: ApiResponse = await ApiService.get(
    API.GET_STATUS_TRANSACTION(orderId)
  );
  return { ...response, data: response.data };
};

export const checkStatusTokenSaved = async ({
  paymentMethod,
  paymentService,
}: {
  paymentMethod: string;
  paymentService: string;
}) => {
  const params = {
    payment_method: paymentMethod,
    payment_service: paymentService,
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
  };
  const response: ApiResponse = await ApiService.post(
    API.GET_CHECK_STATUS_TOKEN,
    params
  );
  return { ...response, data: response.data };
};

export const getLinkShopeePayTransaction = async ({
  paymentMethod,
  paymentService,
  returnUrl,
}: {
  paymentMethod: string;
  paymentService: string;
  returnUrl: string;
}) => {
  const response = await ApiService.post(API.GET_LINK_SHOPEEPAY_TRANSACTION, {
    payment_method: paymentMethod,
    payment_service: paymentService,
    return_url: returnUrl,
  });
  return { ...response, data: response.data };
};

export const linkZaloPayTransaction = async ({
  callbackLink,
  package_id,
  promotion_code,
  confirm,
}: any) => {
  const params = {
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
    package_id,
    confirm,
    promotion_code,
    redirect_deep_url: callbackLink,
  };
  const config = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  const response: ApiResponse = await ApiService.post(
    API.LINK_ZALOPAY,
    params,
    config
  );
  const data = response.data;
  return { ...response, data: Transaction({ data }) };
};

export const chargeZaloPay = async ({
  packageId,
  promotionCode,
}: {
  packageId: string;
  promotionCode: string;
}) => {
  const params = {
    package_id: packageId,
    promotion_code: promotionCode || "",
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
  };
  const config = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  const response = await ApiService.post(API.CHARGE_ZALOPAY, params, config);
  const data: IResultTransaction = response.data;
  const result = ResultTransaction({ data });
  return { ...response, data: result };
};

export const createMoMoTransaction = async ({
  packageId,
  returnUrl,
  tokenId,
  cancelUrl,
  promotionCode,
  paymentService,
  paymentMethod,
  redirectUri,
}: {
  packageId: number;
  returnUrl: string;
  tokenId: string;
  cancelUrl: string;
  promotionCode: string;
  paymentService: string;
  paymentMethod: string;
  redirectUri: string;
}) => {
  const params = {
    payment_method: paymentMethod,
    payment_service: paymentService,
    redirect_uri: redirectUri || undefined,
    package_id: String(packageId),
    promotion_code: promotionCode,
    token_id: tokenId,
    return_url: returnUrl,
    cancel_url: cancelUrl,
  };
  const response: ApiResponse = await ApiService.post(
    API.CREATE_MOMO_TRANSACTION,
    params
  );
  const data: ITransaction = response.data;
  return { ...response, data: Transaction({ data }) };
};

type typePaymentMethod = {
  paymentMethod: string;
  packageId: string;
  tokenId?: string;
  paymentService: string;
  cancelUrl?: string;
  returnUrl?: string;
  promotionCode: string;
};
export const createTransaction = async ({
  paymentMethod,
  packageId,
  tokenId,
  paymentService,
  cancelUrl,
  returnUrl,
  promotionCode,
}: typePaymentMethod) => {
  const response: ApiResponse = await ApiService.post(API.CREATE_TRANSACTION, {
    payment_method: paymentMethod,
    package_id: packageId,
    token_id: tokenId,
    payment_service: paymentService,
    cancel_url: cancelUrl,
    return_url: returnUrl,
    platform: process.env.REACT_APP_CAMPAIGN_PLATFORM,
    promotion_code: promotionCode,
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
  const response: ApiResponse = await ApiService.post(
    API.GET_INFO_TRANSACTION,
    {
      order_id: orderId,
      return_url: returnUrl,
      platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
    }
  );
  const data = response?.data?.result?.data;
  const result = {
    amount: data.amount,
    currency: data.currency,
    qrCodeImg: data.qr_code_img,
    redirectUrl: data.redirect_url,
    orderId: response.data.result.order_id,
    success: true,
  };
  return { ...response, data: result };
};

export const checkMomoTransaction = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const params = {
    txn_ref: orderId,
  };
  const response = await ApiService.post(API.CHECK_MOMO_TRANSACTION, params);
  return { ...response, data: response.data };
};
export const createVnPayTransaction = async ({
  packageId,
  promotionCode,
}: {
  packageId: number;
  promotionCode: string;
}) => {
  const params = {
    package_id: packageId,
    promotion_code: promotionCode,
  };
  const config = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  const response: ApiResponse = await ApiService.post(
    API.CREATE_VNPAY_QR_TRANSACTION,
    params,
    config
  );
  return { ...response, data: response.data };
};

export const createVnPayTransactionByGateway = async ({
  packageId,
  promotionCode,
  bankCode,
}: {
  packageId: number;
  promotionCode: string;
  bankCode: string;
}) => {
  const params = {
    package_id: packageId,
    promotion_code: promotionCode,
    order_info: "Noi dung thanh toan",
    url_return: RETURN_URL + PAYMENT_METHOD.VN_PAY,
    bank_code: bankCode || "VNPAYQR",
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
  };
  const config = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  const response: ApiResponse = await ApiService.post(
    API.CREATE_VNPAY_TRANSACTION,
    params,
    config
  );
  return { ...response, data: response.data };
};

export const checkVnPayTransaction = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const response: ApiResponse = await ApiService.get(
    API.CHECK_VNPAY_TRANSACTION(orderId)
  );
  const data: IResultTransaction = response.data;
  const result = ResultTransaction({ data });
  return { ...response, data: result };
};

export const createAsianPayTransaction = async ({
  packageId,
  promotionCode,
}: {
  packageId: number;
  promotionCode: string;
}) => {
  const config = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };
  const params = {
    package_id: packageId,
    promotion_code: promotionCode,
    platform: mobileCheck() ? PLATFORM.MOBILE_WEB : PLATFORM.WEB,
  };
  const response: { data: unknown; success: boolean } = await ApiService.post(
    API.CREATE_ASIAPAY_TRANSACTION,
    params,
    config
  );
  return { ...response, data: response.data };
};

export const getAsiaPayChannel = async () => {
  const response: ApiResponse = await ApiService.get(API.GET_ASIAPAY_CHANNEL);
  return { ...response, data: response.data };
};

export const checkAsiaPayTransaction = async ({
  orderId,
}: {
  orderId: string;
}) => {
  const params = {
    txn_ref: orderId,
  };

  const response: ApiResponse = await ApiService.get(
    API.CHECK_ASIAPAY_TRANSACTION,
    {
      params,
    }
  );
  const data: IResultTransaction = response.data;
  const result = ResultTransaction({ data });
  return { ...response, data: result };
};
