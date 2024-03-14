import React, { useEffect } from "react";
import QRCode from "./QRCode";
import {
  ERROR_TYPE,
  PAYMENT_METHOD,
  PAYMENT_TYPE,
  STEP,
} from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  checkStatusVNPayTransaction,
  createVNPayTransaction,
  resetVNPayData,
  selectedBank,
} from "../../state/features/vnpaySlice";
import Spinner from "../Spinner";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../state/features/appSlice";
import { checkStatusExpriedCampaign } from "../../models/Transaction";
import VNPayBanks from "./VNPayBanks";

const VNPay = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const packageSelected = useAppSelector(
    (state) => state.payment.packageSelected
  );
  const { isLoading, data, dataStatus, error } = useAppSelector(
    (state) => state.vnpay
  );
  const { typeError, step } = useAppSelector((state) => state.payment);

  const compaignData = useAppSelector(
    (state) => state.campaign?.data
  );
  const { promotion_code: promotionCode, end_at: endExpried } =
    compaignData || {};

  const handleCreateTransaction = async () => {
    if (!isMobile) {
      if (await checkStatusExpriedCampaign(dispatch, endExpried)) return;
      await dispatch(
        createVNPayTransaction({
          packageId: packageSelected.id,
          promotionCode,
          bankCode: "",
        })
      );
    }
  };
  const handleCheckStatus = async () => {
    if (!isMobile) {
      await dispatch(checkStatusVNPayTransaction({ orderId: data?.orderId }));
      if (dataStatus?.success && dataStatus?.data?.status === 1) {
        handleGotoResultVNPay(dataStatus.data);
      }
    }
  };

  const handleGotoResultVNPay = (transaction: any) => {
    const orderId = transaction?.orderId || transaction?.txnRef || "";
    let url = `ket-qua?method=${PAYMENT_METHOD.VN_PAY}`;
    if (orderId) url += `&orderId=${orderId}`;
    navigate(url);
  };

  useEffect(() => {
    if (step === STEP.CREATE_TRANSACTION) {
      handleCreateTransaction();
    }
  }, [step]);

  useEffect(() => {
    return () => {
      dispatch(resetVNPayData());
      dispatch(selectedBank(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (isMobile && isLoading) dispatch(setLoading(isLoading));
    return () => {
      if (isMobile) dispatch(setLoading(false));
    };
  }, [isLoading, isMobile, dispatch]);

  if (
    (isLoading || step !== STEP.CREATE_TRANSACTION) &&
    typeError !== ERROR_TYPE.NETWORK_ERROR
  )
    return <Spinner />;

  return (
    <>
      {!isMobile ? (
        <QRCode
          paymentName={PAYMENT_TYPE.VNPAY}
          QRImage={data.qrCodeImg}
          onRetry={handleCreateTransaction}
          qrDisplayTime={0}
          error={error}
          onCheckStatus={handleCheckStatus}
          netWorkError={typeError}
        />
      ) : (
        <VNPayBanks />
      )}
    </>
  );
};

export default React.memo(VNPay);
