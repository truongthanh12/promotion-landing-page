import React, { useEffect } from "react";
import {
  ERROR_TYPE,
  PAYMENT_METHOD,
  PAYMENT_TYPE,
  RETURN_URL,
  STEP,
} from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  createViettelPayTransaction,
  resetViettelPayData,
} from "../../state/features/viettelPaySlice";
import { isMobile } from "react-device-detect";
import { setLoading } from "../../state/features/appSlice";
import { checkStatusExpriedCampaign } from "../../models/Transaction";
import QRCode from "../../components/PaymentMethods/QRCode";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { checkTransactionStatus } from "../../state/features/paymentSlice";

const ViettelMoney = () => {
  const navigate = useNavigate();
  const packageSelected = useAppSelector(
    (state) => state.payment.packageSelected
  );
  const { isLoading, data, error } = useAppSelector(
    (state) => state.viettelpay
  );
  const { dataStatus, typeError, step } = useAppSelector((state) => state.payment);
  const { qr_code_img: qrCodeImg, order_id: orderId } = data.result || {};
  const compaignData = useAppSelector((state) => state.campaign?.data);
  const { promotion_code: promotionCode, end_at: endExpried } =
  compaignData || {};
  const dispatch = useAppDispatch();
  const handleCreateTransaction = async () => {
    if (step === STEP.CREATE_TRANSACTION) {
      if (await checkStatusExpriedCampaign(dispatch, endExpried)) return;
      if (packageSelected && packageSelected.id) {
        await dispatch(
          createViettelPayTransaction({
            packageId: String(packageSelected.id),
            paymentService: PAYMENT_METHOD.VIETTEL_PAY,
            paymentMethod: PAYMENT_METHOD.VIETTEL_PAY,
            returnUrl: RETURN_URL + PAYMENT_METHOD.VIETTEL_PAY,
            cancelUrl: RETURN_URL + PAYMENT_METHOD.VIETTEL_PAY,
            promotionCode,
          })
        );
      }
    }
  };

  const handleCheckStatus = async () => {
    if (!isMobile) {
      await dispatch(checkTransactionStatus({ orderId }));
      if (dataStatus.success && dataStatus.data.status === 1) {
        handleGotoResultViettelPay(dataStatus.data);
      }
    }
  };

  const handleGotoResultViettelPay = (transaction: any) => {
    const orderId = transaction?.orderId || transaction?.txnRef || "";
    let url = `ket-qua?method=${PAYMENT_METHOD.VIETTEL_PAY}`;
    if (orderId) url += `&orderId=${orderId}`;
    navigate(url);
  };

  useEffect(() => {
    if (step === STEP.CREATE_TRANSACTION) {
      handleCreateTransaction();
    }
    return () => {
      dispatch(resetViettelPayData());
    };
  }, [packageSelected, step]);

  useEffect(() => {
    if (isMobile && isLoading) dispatch(setLoading(isLoading));
    return () => {
      if (isMobile) dispatch(setLoading(false));
    };
  }, [isLoading, isMobile]);

  if (
    (isLoading || step !== STEP.CREATE_TRANSACTION) &&
    typeError !== ERROR_TYPE.NETWORK_ERROR
  )
    return <Spinner />;

  return (
    <QRCode
      paymentName={PAYMENT_TYPE.VIETTEL_MONEY}
      QRImage={qrCodeImg}
      onRetry={handleCreateTransaction}
      qrDisplayTime={0}
      error={error}
      onCheckStatus={handleCheckStatus}
      netWorkError={typeError}
    />
  );
};

export default React.memo(ViettelMoney);
