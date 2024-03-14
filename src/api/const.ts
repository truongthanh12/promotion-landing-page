export const API = {
  GET_CONFIG: (key: string) => `/backend/cm/v5/get-config?key=${key}`,
  GET_PACKAGES: `/backend/billing/packages`,
  // Payment
  CHECK_SEGMENT_BILLING: "/backend/billing/ldp-campaign/valid",
  CREATE_TRANSACTION: "/backend/billing/v2/transaction",
  GET_INFO_TRANSACTION: "/backend/billing/v2/transaction/pay",
  GET_RESULT_TRANSACTION: (orderId: string) =>
    `/backend/billing/v2/transaction/result/${orderId}`,
  GET_STATUS_TRANSACTION: (orderId: string) =>
    `/backend/billing/v2/transaction/status/${orderId}`,
  GET_CHECK_STATUS_TOKEN: "/backend/billing/v2/tokens",
  GET_LINK_TOKEN: "/backend/billing/v2/tokens/link",
  CANCEL_TRANSACTION_ZALOPAY: (id: string) =>
    `/backend/billing/cancel-transaction-zalopay/${id}`,

  CREATE_TRANSACTION_ZALOPAY: `/backend/billing/transaction-zalopay`,
  CHECK_ZALOPAY_TRANSACTION: (zlOrderId: string) =>
    `/backend/billing/statustransaction-zalopay/${zlOrderId}`,
  CHECK_LINK_ZALOPAY_TRANSACTION: (zlOrderId: number) =>
    `/backend/billing/agreement-pay-binding-status-zalopay/${zlOrderId}`,
  LINK_ZALOPAY: `/backend/billing/agreement-pay-binding-zalopay`,
  CHARGE_ZALOPAY: `/backend/billing/charge-by-token-zalopay`,

  CREATE_MOMO_TRANSACTION: `/backend/billing/transaction-momo`,
  CHECK_MOMO_TRANSACTION: `/backend/billing/statustransaction-momo`,
  CREATE_VNPAY_TRANSACTION: `/backend/billing/transaction-vnpay`,
  CHECK_VNPAY_TRANSACTION: (id: string) =>
    `/backend/billing/statustransaction-vnpay?txn_ref=${id}`,
  CREATE_ASIAPAY_TRANSACTION: `/backend/billing/transaction-asiapay`,
  GET_ASIAPAY_CHANNEL: `/backend/billing/payment/on-channel/web`,
  GET_VNPAY_LIST: `/backend/billing/get-list-bank-vnpay`,
  CHECK_ASIAPAY_TRANSACTION: `/backend/billing/statustransaction-asiapay`,
  GET_LINK_SHOPEEPAY_TRANSACTION: `/backend/billing/v2/tokens/link`,
  CREATE_VNPAY_QR_TRANSACTION: `/backend/billing/transaction-vnpay-qr`,
};
