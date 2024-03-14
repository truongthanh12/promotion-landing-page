export const ZALOPAY_TYPE = {
  NAME: "zalopay",
  CREATE_TRANSACTION: "zalopay/createZaloPayTransaction",
  CHECK_TRANSACTION: "zalopay/checkZaloPayTransaction",
  CHECK_TRANSACTION_LINK: "zalopay/checkLinkZaloPayTransaction",
  LINK_TRANSACTION: "zalopay/linkZaloPayTransaction",
};

export const SHOPEEPAY_TYPE = {
  NAME: "shopeePay",
  CREATE_TRANSACTION: "shopeePay/createShopeePayTransaction",
  CHECK_TRANSACTION: "shopeePay/checkShopeePayTransaction",
  CHECK_TRANSACTION_LINK: "shopeePay/checkLinkShopeePayTransaction",
  LINK_TRANSACTION: "shopeePay/linkShopeePayTransaction",
  GET_STATUS_TRANSACTION: "shopeePay/getStatusTransaction",
};

export const POPUP_TYPE = {
  NAME: "popup",
};

export const PAYMENT_TYPE = {
  NAME: "payment",
  CHECK_SEGMENT: "payment/checkSegment",
  CHECK_TRANSACTION: "payment/checkStatusTransaction",
};

export const PACKAGE_TYPE = {
  NAME: "packages",
  GET_PACKAGES: "packages/getPackagesCampaign",
};

export const CAMPAIGN_TYPE = {
  NAME: "campaign",
  GET_CONFIG: "campaign/getCampaignConfig",
};

export const MOMO_TYPE = {
  NAME: "momo",
  GET_STATUS_TRANSACTION: "momo/getStatusTransaction",
  CREATE_TRANSACTION: "momo/createTransaction",
};

export const VIETTEL_PAY_TYPE = {
  NAME: "viettelPay",
  GET_STATUS_TRANSACTION: "viettelPay/getStatusTransaction",
  CREATE_TRANSACTION: "viettelPay/createTransaction",
};

export const VNPAY_TYPE = {
  NAME: "vnpay",
  GET_STATUS_TRANSACTION: "vnpay/getStatusTransaction",
  CREATE_TRANSACTION: "vnpay/createTransaction",
};

export const ASIA_PAY_TYPE = {
  NAME: "asiaPay",
  GET_STATUS_TRANSACTION: "asiaPay/getStatusTransaction",
  CREATE_TRANSACTION: "asiaPay/createTransaction",
  GET_CONFIG_CHANNEL: "asiaPay/getConfigChannel",
};

export const APP = {
  name: "app",
};
