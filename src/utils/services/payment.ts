import { PAYMENT_METHOD, PAYMENT_METHOD_BE } from "utils/constants";

export const parseMethodId = (methodId: string) => {
  switch (methodId) {
    case PAYMENT_METHOD.ASIAPAY:
      return PAYMENT_METHOD_BE.ASIAPAY;
    case PAYMENT_METHOD.VN_PAY:
      return PAYMENT_METHOD_BE.VN_PAY;
    case PAYMENT_METHOD.MOBI:
    case PAYMENT_METHOD.VIETTEL:
    case PAYMENT_METHOD.VINA:
      return PAYMENT_METHOD_BE.SMS;
    case PAYMENT_METHOD.MOCA:
      return PAYMENT_METHOD_BE.MOCA;
    case PAYMENT_METHOD.MOMO:
      return PAYMENT_METHOD_BE.MOMO;
    case PAYMENT_METHOD.VIETTEL_PAY:
      return PAYMENT_METHOD_BE.VIETTEL_PAY;
    case PAYMENT_METHOD.IAP:
      return PAYMENT_METHOD_BE.IAP;
    case PAYMENT_METHOD.TP_BANK:
      return PAYMENT_METHOD_BE.TP_BANK;
    case PAYMENT_METHOD.ZALO_PAY:
      return PAYMENT_METHOD_BE.ZALO_PAY;
    case PAYMENT_METHOD.SHOPEE_PAY:
      return PAYMENT_METHOD_BE.SHOPEE_PAY;
    default:
      return "";
  }
};
