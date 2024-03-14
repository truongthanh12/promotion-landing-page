import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { PAYMENT_METHOD, STATUS_TRANSACTION } from "../../utils/constants";
import Success from "../../components/PaymentResults/Success";
import Fail from "../../components/PaymentResults/Fail";
import Processing from "../../components/PaymentResults/Processing";
import { checkZaloPayTransaction } from "../../state/features/zalopaySlice";
import { checkTransactionStatus } from "../../state/features/paymentSlice";
import { checkStatusAsiaPayTransaction } from "../../state/features/asiaPaySlice";
import { scrollToTop, trimmedPathname } from "../../utils/helper";
import { getCampaignConfig } from "../../state/features/campaignSlice";
import { checkStatusVNPayTransaction } from "../../state/features/vnpaySlice";
import ConfigLocalStorage from "../../utils/config/ConfigLocalStorage";
import LocalStorage from "../../utils/config/LocalStorage";

const TIME_TO_REDIRECT = 60000;

const PaymentResult = () => {
  const [status, setStatus] = useState(STATUS_TRANSACTION.PROCESSING);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const method = searchParams.get("method") || "";
  const zlOrderId = useMemo(() => {
    let zlOrderIdTemp =
      searchParams.get("orderId") || searchParams.get("apptransid") || "";
    const zlOderIdLocal: any = ConfigLocalStorage.get(LocalStorage.ZL_ORDER_ID);
    if (
      searchParams.get("binding_id") &&
      +(searchParams.get("status") || "") &&
      !zlOrderIdTemp
    ) {
      zlOrderIdTemp = zlOderIdLocal;
    }
    return zlOrderIdTemp;
  }, [searchParams]);
  const orderId =
    searchParams.get("orderId") ||
    searchParams.get("order_id") ||
    searchParams.get("vnp_TxnRef") ||
    searchParams.get("ticket") ||
    zlOrderId ||
    "";
  const asiaPayId = searchParams.get("Ref") || "";
  const referenceId = searchParams.get("reference_id") || "";
  const timerRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();

  const { data } = useAppSelector((state) => state.campaign);
  const { methods } = data || {};

  const paymentState = useAppSelector((state) =>
    method === PAYMENT_METHOD.ZALO_PAY
      ? state.zalopay
      : method === PAYMENT_METHOD.ASIAPAY
        ? state.asiapay
        : method === PAYMENT_METHOD.VN_PAY
          ? state.vnpay.dataStatus
          : state.payment.dataStatus
  );

  const methodInfo = useMemo(() => {
    return methods?.find((item: any) => item.id === method);
  }, [method, methods]);
  const { tel, name } = methodInfo || {};
  useEffect(() => {
    const checkStatus = () => {
      const action: any =
        method === PAYMENT_METHOD.ZALO_PAY
          ? checkZaloPayTransaction({ zlOrderId: orderId })
          : method === PAYMENT_METHOD.ASIAPAY
            ? checkStatusAsiaPayTransaction({ orderId: asiaPayId })
            : method === PAYMENT_METHOD.VN_PAY
              ? checkStatusVNPayTransaction({ orderId })
              : checkTransactionStatus({ orderId: orderId || referenceId });
      dispatch(action);
    };

    if (status === STATUS_TRANSACTION.PROCESSING) {
      checkStatus();
      intervalRef.current = setInterval(checkStatus, 6000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, method, orderId, asiaPayId, referenceId, status]);

  useEffect(() => {
    const { isLoading, status, error } = paymentState?.data || {};

    if (isLoading) {
      setStatus(STATUS_TRANSACTION.PROCESSING);
      return;
    }

    if (status === 1) {
      setStatus(STATUS_TRANSACTION.SUCCESS);
    } else if (error || [2, 3, 4].includes(status)) {
      setStatus(STATUS_TRANSACTION.FAILED);
    }
  }, [paymentState?.data]);

  useEffect(() => {
    if (status === STATUS_TRANSACTION.PROCESSING) {
      timerRef.current = setTimeout(() => {
        setStatus(STATUS_TRANSACTION.FAILED);
        clearInterval(intervalRef.current);
      }, TIME_TO_REDIRECT);
      return () => {
        clearTimeout(timerRef.current);
      };
    }
  }, [status]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    dispatch(getCampaignConfig({ key: trimmedPathname }));
  }, [dispatch]);

  const renderContent = () => {
    switch (status) {
      case STATUS_TRANSACTION.SUCCESS:
        return <Success data={paymentState?.data} />;
      case STATUS_TRANSACTION.FAILED:
        return (
          <Fail
            orderId={orderId || asiaPayId || referenceId}
            data={paymentState?.data}
            status={status}
            error={paymentState?.error}
            tel={tel}
            name={name}
          />
        );

      case STATUS_TRANSACTION.PROCESSING:
        return (
          <Processing
            orderId={orderId || asiaPayId || referenceId}
            tel={tel}
            name={name}
          />
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default React.memo(PaymentResult);
