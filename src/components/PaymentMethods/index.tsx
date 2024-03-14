import { PAYMENT_METHOD } from "../../utils/constants";
import AsiaPay from "./AsiaPay";
import Momo from "./Momo";
import { memo } from "react";
import ViettelMoney from "./ViettelMoney";
import ShopeePay from "./ShopeePay";
import VNPay from "./VNPay";
import ZaloPay from "./ZaloPay";
import React from "react";

const PaymentMethods = ({ id }: { id?: string }) => {
  switch (id) {
    case PAYMENT_METHOD.VIETTEL_PAY:
      return <ViettelMoney />;
    case PAYMENT_METHOD.MOMO:
      return <Momo />;
    case PAYMENT_METHOD.SHOPEE_PAY:
      return <ShopeePay />;
    case PAYMENT_METHOD.VN_PAY:
      return <VNPay />;
    case PAYMENT_METHOD.ZALO_PAY:
      return <ZaloPay />;
    case PAYMENT_METHOD.ASIAPAY:
      return <AsiaPay />;
    default:
      return null;
  }
};

export default memo(PaymentMethods);
