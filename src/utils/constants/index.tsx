import { pathname } from "../helper";

import DOWNLOAD_APPSTORE from "../../assets/images/appstore.svg";
import DOWNLOAD_GG_PLAY from "../../assets/images/googleplay.svg";
import DOWNLOAD_QR from "../../assets/images/qr-app-footer.svg";
import LOGO_MIT from "../../assets/images/logo-mit.svg";
import LOGO from "../../assets/images/logo.svg";
import TIMEOUT_ERROR from "../../assets/images/image-error.svg";
import ENDED from "../../assets/images/cat_failed.svg";
import QR_CODE from "../../assets/images/qr-code.png";
import CAT_FAILED from "../../assets/images/cat_failed.svg";
import CAT_PROCESSING from "../../assets/images/cat_processing.svg";
import CAT_SUCCESS from "../../assets/images/cat_success.svg";
import BANNER from "../../assets/images/banner.svg";
import ARROW from "../../assets/images/arrow.svg";
import DEFAULT_BANNER_16x9 from "../../assets/images/thumb_default_16x9.svg";
import LOGO_INTRO from "../../assets/images/logo_slogan.svg";
import LOGO_PCIDSS from "../../assets/images/pci-dss-compliant-logo-vector.svg";

export const API_BASE_URL = `https://${process.env.REACT_APP_NODE_ENV}-api.vieon.vn`;

export const STEP = {
  TERM: 0,
  METHOD: 1,
  CREATE_TRANSACTION: 2,
  PAYMENT: 3,
};

export const PAYMENT_TYPE = {
  ZALOPAY: "ZaloPay",
  SHOPEE_PAY: "ShopeePay",
  VNPAY: "VNPay",
  VIETTEL_MONEY: "ViettelPay",
  CARD: "CREDIT",
  MOMO: "Momo",
};

export const POPUP_NAME = {
  PHONE_NUMBER_USED: "PHONE_NUMBER_USED",
  TIMEOUT: "TIMEOUT",
  ENDED: "ENDED",
};

export const ERROR_TYPE = {
  TIMEOUT: "TIMEOUT",
  ENDED: "ENDED",
  NOT_FOUND: "NOT_FOUND",
  NETWORK_ERROR: "NETWORK_ERROR",
};

export const STATUS_TRANSACTION = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PROCESSING: "PROCESSING",
};

export const PLATFORM = {
  WEB: "web",
  MOBILE_WEB: "mobile_web",
  SMART_TV: "smart_tv",
  TABLET_WEB: "tablet_web",
  SMART_TV_WEB: "smarttv_web",
};

export const UTM_SOURCE = {
  TP_BANK: "tpbank",
  ZALO_PAY: "zalopay",
  ADBRO: "Adbro",
};

export const ZALOPAY = {
  MSG: {
    NOT_ENOUGH_BALANCE: "Số dư không đủ",
  },
};

export const PAYMENT_METHOD = {
  NAPAS: "napas",
  ASIAPAY: "asiapay",
  VN_PAY: "vnpay",
  MOMO: "momo",
  MOCA: "moca",
  MOBI: "mobiphone",
  VINA: "vinaphone",
  ZALO_PAY: "zalopay",
  SHOPEE_PAY: "shopeepay",
  VIETTEL: "viettel",
  PAYOO: "payoo",
  IAP: "IAP",
  TP_BANK: "tpbank",
  VIETTEL_PAY: "viettelpay",
  QRCODE: "qrcode",
};

export const SERVICE_NAME = {
  NAPAS: "napas",
  ASIAPAY: "asiapay",
  VN_PAY: "vnpay",
  MOMO: "momo",
  MOCA: "moca",
  MOBI: "mobiphone",
  VINA: "vinaphone",
  ZALO_PAY: "zalopay",
  SHOPEE_PAY: "shopeepay",
  VIETTEL: "viettel",
  PAYOO: "payoo",
  IAP: "IAP",
  TP_BANK: "tpbank",
  VIETTEL_PAY: "viettelpay",
};

export const PAYMENT_METHOD_BE = {
  CARD: "Card",
  ASIAPAY: "AsiaPay",
  VN_PAY: "VNPay",
  MOCA: "Moca",
  SMS: "SMS",
  ZALO_PAY: "ZaloPay",
  SHOPEE_PAY: "ShopeePay",
  IAP: "IAP",
  TP_BANK: "TPBank",
  VIETTEL_PAY: "ViettelPay",
  WALLET: "wallet",
  MOMO: "Momo",
};

export enum CARD_CREDIT {
  CARD_NUMBER = "cardNumber",
  CARD_NAME = "cardName",
  CARD_VALID_DATE = "cardValidDate",
  CARD_CVV = "cardCVVCVC",
  PHONE_NUMBER = "phoneNumber",
}

export const PAGE = {
  HOME: `${pathname}`,
  RESULT: `/ket-qua`,
};

export const ERROR_CODE = {
  CODE_0: 0, // Thành công
  CODE_1: 1, // Các params để gọi API không đúng
  CODE_2: 2, // Sdt không đúng format
  CODE_3: 3, // Campaign không áp dụng cho user ở segment này
  CODE_4: 4, // User đã mua gói
  CODE_5: 5, // Lấy thông tin user thất bại
  CODE_98: 98, // Hạ tầng không ổn định
};

export const STATUS_CODE = {
  CODE_423: 423, // Hệ thống đang xử lý - tracsaction zalopay - too many requests
  CODE_429: 429, // Hệ thống đang xử lý - tracsaction momo - too many requests
};

export const CARD_TYPE = [
  {
    name: "AMEX",
    pattern: /^3[47]/,
  },
  {
    name: "JCB",
    pattern: /^35(2[89]|[3-8][0-9])/,
  },
  {
    name: "VISA",
    pattern: /^4/,
  },
  {
    name: "Master",
    pattern: /^5/,
  },
  {
    name: "Discover",
    pattern:
      /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
  },
  {
    name: "UPOP",
    pattern: /^(62|88)/,
  },
];

export const REGEX = {
  PHONE_NUMBER: /^0[35789][0-9]{8}$/,
};

export const SCAN_QR_CODE_TIMER = 300;
export const VieON_TEL = "1800599920";
export const VieON = {
  SUPPORT_EMAIL: "support@vieon.vn",
  HOTLINE: "1800 899 920",
};
export const VieON_URL = "https://vieon.vn";
export const VieON_RULES_URL = VieON_URL + "/quy-dinh/";
export const REPORT_LINK = process.env.REACT_APP_REPORT_LINK || `${pathname}`;
export const RETURN_URL = `${process.env.REACT_APP_DOMAIN_WEB}${pathname}${PAGE.RESULT}?method=`;

export const IMAGES = {
  DOWNLOAD_APPSTORE,
  DOWNLOAD_GG_PLAY,
  DOWNLOAD_QR,
  LOGO_MIT,
  LOGO,
  TIMEOUT_ERROR,
  ENDED,
  QR_CODE,
  CAT_FAILED,
  CAT_PROCESSING,
  CAT_SUCCESS,
  BANNER,
  ARROW,
  DEFAULT_BANNER_16x9,
  LOGO_INTRO,
  LOGO_PCIDSS,
};

export const TEXT = {
  VALIDATED_CARD_EXPIRED: "Ngày hết hạn không hợp lệ.",
  VALIDATED_CARD_NUMBER: "Số thẻ không hợp lệ.",
  CONFIRM: "Xác nhận",
  CHANGE_PHONE: "Đổi SĐT",
  CHOOSE_TERM_PACKAGE: "Chọn thời hạn gói",
  CHOOSE_PAYMENT: "Chọn Phương thức thanh toán",
  PAYMENT: "Thanh toán",
  PAYMENT_BY: "Bạn đang thanh toán bằng",
  PAYMENT_EXPIRE_IN: "Đơn hàng hết hạn sau:",
  CARD_NUMBER: "Số thẻ",
  CARD_NAME: "Tên chủ thẻ",
  CARD_VALID_DATE: "Ngày hết hạn",
  CARD_CVV: "CVV/CVC",
  BUY_PACKAGE: "Đăng ký gói",
  CHANGE_PHONE_NUMBER: "Đổi số điện thoại",
  ACCOUNT_ALREADY_RECEIVED: "Tài khoản đã nhận được ưu đãi.",
  PLEASE_CHANGE_PHONE_NUMBER:
    "Vui lòng nhập số điện thoại khác để tham gia chương trình",
  DETAIL_INFO: "Thông tin chi tiết",
  ACCOUNT_NAME: "Tài khoản VieON",
  PACKAGE_NAME: "Tên gói",
  PACKAGE_TERM: "Thời hạn gói",
  PACKAGE_PRICE: "Giá thời hơn",
  WHEN_CANCLE: "Khi bạn hủy",
  PACKAGE_VALID_DATE: "Ngày hiệu lực",
  PACKAGE_EXPIRE_DATE: "Sử dụng đến",
  PACKAGE_NEXT_PAYMENT_TERM: "Kỳ thanh toán tiếp theo",
  PACKAGE_TOTAL_PRICE: "Thành tiền",
  TERM_TO_USE: `Bằng việc thanh toán, bạn đồng ý với<a href=${VieON_RULES_URL} target="_blank" class="text-primary px-1">Điều Khoản Sử Dụng, Chính Sách Và Quy Định Chung</a>của VieON, và ủy quyền cho VieON tự động gia hạn khi hết hạn sử dụng. Bạn có thể hủy gia hạn bất cứ lúc nào.`,
  BACK_TO_HOME: "Trở về Trang chủ",
  CONTINUE_WATCH_VieON: "Truy cập VieON",
  ACCESS_TO_VieON: "Truy cập VieON",
  PROCESSING_TRANSACTION_TITLE: "Giao dịch đang chờ xử lý",
  TRANSACTION_SUCCESS: "Giao dịch thành công",
  TRANSACTION_CODE: "Mã giao dịch",
  UNSUCCESSFULLY_BUY_TITLE: "Giao dịch không thành công",
  CONTENT_NAME: "Tên nội dung",
  TRANSACTION_DATE: "Ngày giao dịch",
  WHEN_YOU_CANCEL: "Khi bạn hủy",
  ERROR_CODE: "Mã lỗi",
  RETRY: "Thử lại",
  ERROR: "Lỗi",
  ERROR_TRANSACTION: "Có lỗi xảy ra. Vui lòng chờ trong giây lát và thử lại.",
  DOWNLOAD_APP: "Tải ứng dụng VieON",
  SCAN_QRCODE_APP: "Quét mã QR bên dưới",
  COPY_LINK_SEND_MOBILE: "Sao chép đường dẫn và gửi đến điện thoại của bạn",
  COPY: "Sao chép",
  DOWNLOAD_APP_STORE: "Tải ứng dụng VieON cho App Store",
  DOWNLOAD_APP_ANDROID: "Tải ứng dụng VieON cho Android",
  QR_DOWNLOAD_APP: "Quét mã QR để tải ứng dụng",
  QR_DOWNLOAD_APP_MOBILE: "Tải ứng dụng VieON tại",
  PAYMENT_QR_CODE_EXPIRED: `Mã giao dịch đã hết hạn. <div>Vui lòng thử lại.</div>`,
  PAYMENT_MOMO_QR_CODE: `Vui lòng bấm Thanh toán để được tiếp tục trên trang thanh toán của Ví MoMo.`,
  PAYMENT_VIETTEL_MONEY_QR_CODE: `Vui lòng bấm Thanh toán để được tiếp tục trên trang thanh toán của Ví Viettel Money.`,
  PAYMENT_QR_CODE_ERROR: `Hệ thống đang xử lý.<div>Vui lòng thử lại sau 15 giây.</div>`,
  PAYMENT_WITH_ZALOPAY: "Đang thanh toán...",
  SELECT_BANK: "Chọn ngân hàng",
  PCIDSS_CONTENT:
    "Bảo mật SSL/TLS, mọi thông tin giao dịch đều được mã hoá an toàn",
  BACK: "Quay lại",
  NEXT: "Tiếp tục",
};

export const MESSAGES = {
  SPAM_INPUT: "Hệ thống đang xử lý. Vui lòng thử lại sau 1 phút.",
  PHONE_NUMBER_EMPTY: "Số điện thoại không được để trống.",
  SPECIFIC_10_DIGITS: "Số điện thoại phải có 10 chữ số.",
  INVALID_PHONE_NUMBER: "Số điện thoại không hợp lệ",
  VALIDATED_CARD_EXPIRED: "Ngày hết hạn không hợp lệ.",
  VALIDATED_CARD_NUMBER: "Số thẻ không hợp lệ.",
  SORRY: "Rất tiếc!",
  ENDED_CAMPAIGN: `<span class="block md:inline">Ưu đãi hiện tại đã kết thúc.</span><span>Tiếp tục trải nghiệm VieON hoặc khám phá thêm ưu đãi khác.</span>`,
  OCURRED_ERROR: "Hệ thống đang xử lý, vui lòng thử lại sau",
  PAGE_NOT_FOUND: "Trang chủ không tìm thấy, vui lòng thử lại",
  MSG_ERROR: "Có lỗi xảy ra. Vui lòng thử lại sau",
  TRANSACTION_NOT_FOUND: "Giao dịch không tồn tại",
  NOT_ENOUGH_BALANCE: "Số dư không đủ",
  OUT_OF_TARGET:
    "Bạn không thuộc đối tượng áp dụng của chương trình. Vui lòng nhập số điện thoại khác.",
  FAIL_TO_GET_USER_INFO: "Lấy thông tin thất bại, vui lòng thử lại.",
  NETWORK_ERROR: "Mất kết nối mạng, vui lòng kiểm tra lại.",
};

export const PLACEHOLDER = {
  TYPE_PHONE_NUMBER: "Nhập SĐT để nhận ưu đãi",
};

export const FOOTER = {
  NAV: {
    RULE: "Quy định",
    ABOUT: "Giới thiệu",
    VieON_ABOUT: {
      PATH: `${VieON_URL}/gioi-thieu-vieon/`,
      NAME: "Giới Thiệu Về VieON",
      TITLE: "Giới Thiệu Về VieON",
      DESC: "Giới Thiệu Về VieON",
    },
    TERMS: {
      PATH: `${VieON_URL}/dieu-khoan-su-dung/`,
      NAME: "Điều khoản sử dụng",
      TITLE: "About Us - Điều Khoản Sử Dụng | VieON",
      DESC: "Điều Khoản Sử Dụng, Chính Sách Và Quy Định Chung, Chính Sách Quyền Riêng Tư, Chính Sách Về Quyền Sở Hữu Trí Tuệ, Các Câu Hỏi Thường Gặp Và Liên Hệ Với Chúng Tôi.",
    },
    AGREEMENT: {
      PATH: `${VieON_URL}/thoa-thuan-va-chinh-sach/`,
      NAME: "Chính Sách Và Quy Định Chung",
      TITLE: "About Us - Thỏa Thuận Và Chính Sách | VieON",
      DESC: "Điều Khoản Sử Dụng, Chính Sách Và Quy Định Chung, Chính Sách Quyền Riêng Tư, Chính Sách Về Quyền Sở Hữu Trí Tuệ, Các Câu Hỏi Thường Gặp Và Liên Hệ Với Chúng Tôi.",
    },
    PRIVATE_POLICY: {
      PATH: `${VieON_URL}/chinh-sach-quyen-rieng-tu/`,
      NAME: "Chính Sách Về Quyền Riêng Tư",
      TITLE: "About Us - Chính sách Quyền Riêng Tư | VieON",
      DESC: "Điều Khoản Sử Dụng, Chính Sách Và Quy Định Chung, Chính Sách Quyền Riêng Tư, Chính Sách Về Quyền Sở Hữu Trí Tuệ, Các Câu Hỏi Thường Gặp Và Liên Hệ Với Chúng Tôi.",
    },
    COPY_RIGHT: {
      PATH: `${VieON_URL}/ban-quyen/`,
      NAME: "Chính Sách Về Sở Hữu Trí Tuệ",
      TITLE: "About Us - Bản Quyền | VieON",
      DESC: "Điều Khoản Sử Dụng, Chính Sách Và Quy Định Chung, Chính Sách Quyền Riêng Tư, Chính Sách Về Quyền Sở Hữu Trí Tuệ, Các Câu Hỏi Thường Gặp Và Liên Hệ Với Chúng Tôi.",
    },
    REGULATION: {
      PATH: `${VieON_URL}/quy-dinh/`,
      NAME: "Hợp Đồng và Chính Sách",
      TITLE: "About Us - Hợp Đồng và Chính Sách | VieON",
      DESC: "Hợp Đồng và Chính Sách",
    },
    POLICY_CANCELLATION: {
      PATH: `${VieON_URL}/chinh-sach-huy-gia-han/`,
      NAME: "Chính Sách Hủy Gia Hạn",
      TITLE: "About Us - Chính Sách Hủy Gia Hạn | VieON",
      DESC: "Chính Sách Hủy Gia Hạn",
    },
    SUPPORT: "Trợ giúp",
    FAQS: {
      PATH: `${VieON_URL}/cau-hoi-thuong-gap/`,
      NAME: "FAQs",
      TITLE: "About Us - Câu Hỏi Thường Gặp | VieON",
      DESC: "Điều Khoản Sử Dụng, Chính Sách Và Quy Định Chung, Chính Sách Quyền Riêng Tư, Chính Sách Về Quyền Sở Hữu Trí Tuệ, Các Câu Hỏi Thường Gặp Và Liên Hệ Với Chúng Tôi.",
    },
    SUPPORT_CENTER: {
      URL: "https://marketing.vieon.vn/help-center",
      NAME: "Trung tâm hỗ trợ",
    },
    CONTACT: "Liên hệ",
    FEEDBACK: "Góp ý",
  },
  COMPANY_INFO: {
    ADDRESS:
      "Công ty Cổ phần VieON - Địa chỉ: Tầng 5, 222 Pasteur, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh.",
    EMAIL: "support@vieon.vn",
    BUSINESS_LICENSE:
      "Giấy phép Cung cấp Dịch vụ Phát thanh, Truyền hình trả tiền số 247/GP-BTTTT cấp ngày 21/07/2023.",
    HOTLINE: "1800.599.920",
  },
  MIT: {
    TITLE: "Bộ công thương",
    LINK: "http://online.gov.vn/Home/WebDetails/58364",
    IMAGE: IMAGES.LOGO_MIT,
  },
  APP_INFO: {},
};
