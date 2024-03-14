import React, { useCallback, useEffect, useRef } from "react";
import QRCode from "./QRCode";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  createShopeePayTransaction,
  linkShopeePayTransaction,
  resetShopeePayData,
} from "../../state/features/shopeePaySlice";
import {
  ERROR_TYPE,
  PAYMENT_METHOD,
  PAYMENT_METHOD_BE,
  PAYMENT_TYPE,
  STEP,
} from "../../utils/constants";
import Spinner from "../Spinner";
import {
  checkStatusShopeePayTransaction,
  checkStatusTokenSaved,
} from "../../api/payment";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { setLoading } from "../../state/features/appSlice";
import { checkStatusExpriedCampaign } from "../../models/Transaction";

const ShopeePay = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const packageSelected = useAppSelector(
    (state) => state.payment.packageSelected
  );
  const { isLoading, data, error } = useAppSelector((state) => state.shopeepay);
  const { typeError, step } = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();
  const campaignData = useAppSelector((state) => state.campaign?.data);
  const dataTransaction = data || {};
  const { redirectUrl, orderId, qrCodeImg, qrDisplayTime } =
    dataTransaction || {};

  const { promotion_code: promotionCode, end_at: endExpried } =
  campaignData || {};

  const handleRecurring = useCallback(async () => {
    const response = await checkStatusTokenSaved({
      paymentMethod: PAYMENT_METHOD_BE.WALLET,
      paymentService: PAYMENT_METHOD.SHOPEE_PAY,
    });
    const tokenId = response.data?.result?.tokens?.[0]?.id;
    if (tokenId && response.success) {
      await dispatch(
        createShopeePayTransaction({
          packageId: String(packageSelected?.id),
          promotionCode,
        })
      );
    } else {
      await dispatch(linkShopeePayTransaction());
    }
  }, [dispatch, packageSelected?.id, promotionCode]);
  
  const handleNonRecurring = useCallback(async () => {
    await dispatch(
      createShopeePayTransaction({
        packageId: String(packageSelected.id),
        promotionCode,
      })
    );
  }, [dispatch, packageSelected.id, promotionCode]);

  const handleTransaction = useCallback(async () => {
    if (await checkStatusExpriedCampaign(dispatch, endExpried)) return;
    if (packageSelected && !packageSelected.recurring) {
      await handleNonRecurring();
    } else {
      await handleRecurring();
    }
  }, [
    packageSelected,
    endExpried,
    dispatch,
    handleRecurring,
    handleNonRecurring,
  ]);

  const handleCheckStatus = async () => {
    if (!isMobile) {
      if (!packageSelected.recurring) {
        const res = await checkStatusShopeePayTransaction({
          orderId,
        });
        if (res?.data?.result && res?.data?.result?.status !== 0) {
          handleGotoResultShopeePay(res?.data?.result);
        }
      } else {
        const response = await checkStatusTokenSaved({
          paymentMethod: PAYMENT_METHOD_BE.WALLET,
          paymentService: PAYMENT_METHOD.SHOPEE_PAY,
        });
        const tokenId = response.data?.result?.tokens?.[0]?.id; // if tokenId has value is linked
        if (tokenId && response.success) {
          handleGotoResultShopeePay(response.data?.result);
        }
      }
    }
  };

  const handleGotoResultShopeePay = (transaction: any) => {
    const orderId =
      transaction?.txnID ||
      transaction?.txn_ref ||
      transaction?.orderId ||
      transaction?.txnRef ||
      transaction?.order_id ||
      "";
    let url = `ket-qua?method=${PAYMENT_METHOD.SHOPEE_PAY}`;
    if (orderId) url += `&orderId=${orderId}`;
    navigate(url);
  };

  useEffect(() => {
    if (step === STEP.CREATE_TRANSACTION) {
      handleTransaction();
    }
    return () => {
      dispatch(resetShopeePayData());
    };
  }, [dispatch, handleTransaction, step]);

  useEffect(() => {
    if (isMobile && isLoading) dispatch(setLoading(isLoading));
    return () => {
      if (isMobile) dispatch(setLoading(false));
    };
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (redirectUrl && isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [redirectUrl]);

  if (
    (isLoading || step !== STEP.CREATE_TRANSACTION) &&
    typeError !== ERROR_TYPE.NETWORK_ERROR
  )
    return <Spinner />;
  if (isMobile) return null;

  return (
    <QRCode
      qrDisplayTime={qrDisplayTime}
      paymentName={PAYMENT_TYPE.SHOPEE_PAY}
      QRImage={qrCodeImg}
      onRetry={handleTransaction}
      onCheckStatus={handleCheckStatus}
      error={error}
      netWorkError={typeError}
    />
  );
};

export default React.memo(ShopeePay);
