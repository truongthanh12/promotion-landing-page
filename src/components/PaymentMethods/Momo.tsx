import React, { useEffect } from "react";
import Notify from "./Notify";
import {
  PAYMENT_METHOD,
  PAYMENT_METHOD_BE,
  STEP,
  TEXT,
} from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  createMomoTransaction,
  resetMomoData,
} from "../../state/features/momoSlice";
import { isMobile } from "react-device-detect";
import { setLoading } from "../../state/features/appSlice";
import { checkStatusExpriedCampaign } from "../../models/Transaction";

const Momo = () => {
  const { step, packageSelected } = useAppSelector((state) => state.payment);
  const { isLoading, error } = useAppSelector((state) => state.momo);

  const { data } = useAppSelector((state) => state.campaign);
  const { promotion_code: promotionCode } = data || {};
  const dispatch = useAppDispatch();
  const handlePayment = async () => {
    if (step === STEP.CREATE_TRANSACTION) {
      if (await checkStatusExpriedCampaign(dispatch)) return;
      if (packageSelected && packageSelected.id) {
        dispatch(
          createMomoTransaction({
            packageId: String(packageSelected.id),
            paymentService: PAYMENT_METHOD.MOMO,
            paymentMethod: PAYMENT_METHOD_BE.WALLET,
            tokenId: "",
            promotionCode,
          })
        );
      }
    }
  };

  const handleRetry = () => {
    dispatch(resetMomoData());
  };

  useEffect(() => {
    if (isLoading && isMobile) dispatch(setLoading(isLoading));
    return () => {
      if (isMobile) dispatch(setLoading(false));
    };
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (isMobile) handlePayment();
  }, [isMobile]);

  useEffect(() => {
    return () => {
      if (step !== STEP.CREATE_TRANSACTION) {
        dispatch(resetMomoData());
      }
    };
  }, [step, dispatch]);

  if (isMobile) return null;
  return (
    <div className="h-full md:h-[calc(100%-64px)]">
      {error ? (
        <Notify
          className="flex flex-col items-center justify-center"
          message={TEXT.PAYMENT_QR_CODE_ERROR}
          onClick={handleRetry}
          isLoading={isLoading}
        />
      ) : (
        <Notify
          className="flex flex-col items-center lg:max-w-[80%] xl:max-w-[70%] justify-center md:text-lg"
          message={TEXT.PAYMENT_MOMO_QR_CODE}
          buttonText={TEXT.PAYMENT}
          onClick={handlePayment}
          isLoading={isLoading}
          buttonContainerClass="w-full px-4"
        />
      )}
    </div>
  );
};

export default React.memo(Momo);
