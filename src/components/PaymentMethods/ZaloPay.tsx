import React, { useEffect, useState } from "react";
import QRCode from "./QRCode";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  checkLinkZaloPayTransaction,
  createZaloPayTransaction,
  linkZaloPayTransaction,
  resetZaloPayData,
} from "../../state/features/zalopaySlice";
import {
  ERROR_TYPE,
  MESSAGES,
  PAYMENT_METHOD,
  PAYMENT_TYPE,
  RETURN_URL,
  STEP,
} from "../../utils/constants";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { chargeZaloPay, checkZaloPayTransaction } from "../../api/payment";
import { useNavigate } from "react-router-dom";
import { mobileCheck, trimmedPathname } from "../../utils/helper";
import { isMobile } from "react-device-detect";
import { setLoading } from "../../state/features/appSlice";
import { checkStatusExpriedCampaign } from "../../models/Transaction";

const ZaloPay = () => {
  const navigate = useNavigate();
  const packageSelected = useAppSelector(
    (state) => state.payment.packageSelected
  );
  const { isLoading, data, error, isZaloPayLinked } = useAppSelector(
    (state) => state.zalopay
  );
  const { typeError, step } = useAppSelector((state) => state.payment);
  const [errorMessage, setErrorMessage] = useState(error?.code);
  const dispatch = useAppDispatch();
  const dataTransaction = data || {};
  const { orderId, qrCodeImg, qrDisplayTime } = dataTransaction || {};
  const compaignData = useAppSelector((state) => state.campaign?.data);
  const { promotion_code: promotionCode, end_at: endExpried } =
    compaignData || {};

  const handleTransaction = async () => {
    if (await checkStatusExpriedCampaign(dispatch, endExpried)) return;
    if (packageSelected) {
      if (packageSelected.recurring) {
        await handleRecurring();
      } else {
        await handleNonRecurring();
      }
    }
  };
  const handleRecurring = async () => {
    const callbackLink = RETURN_URL + PAYMENT_METHOD.ZALO_PAY;
    const zaloLinkedData: any = await dispatch(checkLinkZaloPayTransaction());
    if (isZaloPayLinked || zaloLinkedData?.payload?.data?.status === 1) {
      handleChargeZaloPayTransaction();
    } else {
      await dispatch(
        linkZaloPayTransaction({
          callbackLink,
          package_id: packageSelected.id,
          promotion_code: promotionCode,
          confirm: mobileCheck() ? 1 : 0,
        })
      );
    }
  };

  const handleNonRecurring = async () => {
    await dispatch(
      createZaloPayTransaction({
        packageId: packageSelected.id,
        giftCode: promotionCode,
        utm_source: "",
      })
    );
  };

  const handleCheckStatus = async () => {
    if (!packageSelected.recurring && !isMobile) {
      const res: any = await checkZaloPayTransaction({
        zlOrderId: orderId,
      });
      if (res?.success && res?.data?.status !== 0) {
        handleGotoResultZaloPay(res?.data);
      }
    } else {
      await dispatch(checkLinkZaloPayTransaction());
      if (isZaloPayLinked) {
        handleChargeZaloPayTransaction();
      }
    }
  };

  const handleChargeZaloPayTransaction = async () => {
    if (isMobile) dispatch(setLoading(true));
    const transactionChargeZaloPay: any = await chargeZaloPay({
      packageId: packageSelected.id,
      promotionCode,
    });
    if (
      transactionChargeZaloPay?.success &&
      transactionChargeZaloPay?.data?.status
    ) {
      handleGotoResultZaloPay(transactionChargeZaloPay?.data);
    } else {
      if (
        transactionChargeZaloPay?.data?.message === MESSAGES.NOT_ENOUGH_BALANCE
      ) {
        return toast.error(MESSAGES.NOT_ENOUGH_BALANCE);
      }
      setErrorMessage(MESSAGES.OCURRED_ERROR);
    }
    if (isMobile) dispatch(setLoading(false));
  };

  const handleGotoResultZaloPay = (transaction: any) => {
    const zlOrderId = transaction?.orderId || transaction?.txnRef || "";
    let url = `/${trimmedPathname}/ket-qua?method=${PAYMENT_METHOD.ZALO_PAY}`;
    if (zlOrderId) url += `&orderId=${zlOrderId}`;
    navigate(url);
  };

  useEffect(() => {
    if (step === STEP.CREATE_TRANSACTION) {
      handleTransaction();
    }
    return () => {
      if (step !== STEP.CREATE_TRANSACTION) {
        dispatch(resetZaloPayData());
      }
    };
  }, [dispatch, handleTransaction, step]);

  useEffect(() => {
    if (isMobile && isLoading) dispatch(setLoading(isLoading));
    return () => {
      if (isMobile) dispatch(setLoading(false));
    };
  }, [dispatch, isLoading]);

  if (
    (isLoading ||
      step !== STEP.CREATE_TRANSACTION ||
      (!qrCodeImg && data?.status !== 0 && isZaloPayLinked && !error)) &&
    typeError !== ERROR_TYPE.NETWORK_ERROR
  )
    return <Spinner />;

  if (isMobile) return null;
  return (
    <QRCode
      qrDisplayTime={qrDisplayTime}
      paymentName={PAYMENT_TYPE.ZALOPAY}
      QRImage={qrCodeImg}
      onRetry={handleTransaction}
      onCheckStatus={handleCheckStatus}
      error={errorMessage || error}
      isAccountLinked={isZaloPayLinked}
      isLoading={isLoading}
      netWorkError={typeError}
    />
  );
};

export default React.memo(ZaloPay);
