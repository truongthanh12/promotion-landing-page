import React, { useState, useEffect, useMemo, memo, useRef } from "react";
import Image from "../ui/Image";
import {
  ERROR_TYPE,
  IMAGES,
  SCAN_QR_CODE_TIMER,
  STEP,
  TEXT,
} from "../../utils/constants";
import Notify from "./Notify";
import { isMobile } from "react-device-detect";
import Spinner from "../Spinner";
import { Button } from "../ui/Button";
import { useAppDispatch } from "../../state/hooks";
import { setStep } from "../../state/features/paymentSlice";

type QRCodeType = {
  onRetry: () => void;
  paymentName: string;
  QRImage: string;
  qrDisplayTime: number;
  onCheckStatus?: () => void;
  error: string;
  isAccountLinked?: boolean;
  isLoading?: boolean;
  netWorkError?: any;
};
const QRCode = ({
  onRetry,
  paymentName,
  QRImage,
  qrDisplayTime,
  onCheckStatus,
  error,
  isAccountLinked,
  isLoading,
  netWorkError,
}: QRCodeType) => {
  const [timeLeft, setTimeLeft] = useState(qrDisplayTime || SCAN_QR_CODE_TIMER);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const minutes = useMemo(() => Math.floor(timeLeft / 60), [timeLeft]);
  const seconds = useMemo(() => timeLeft % 60, [timeLeft]);
  const dispatch = useAppDispatch();

  const handleRetry = () => {
    onRetry();
    setTimeLeft(qrDisplayTime || SCAN_QR_CODE_TIMER);
  };

  const handleBack = () => {
    dispatch(setStep(STEP.METHOD));
  };

  useEffect(() => {
    if (!timeLeft || !!error || isMobile) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime % 6 === 0) {
          onCheckStatus && onCheckStatus();
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, [timeLeft, qrDisplayTime, error, onCheckStatus]);

  if (!timeLeft || isMobile)
    return (
      <div className="h-full md:h-[calc(100%-64px)]">
        <Notify
          className="flex flex-col items-center justify-center"
          message={TEXT.PAYMENT_QR_CODE_EXPIRED}
          onClick={handleRetry}
          isLoading={isLoading}
        />
      </div>
    );

  if ((!!error && !QRImage) || netWorkError === ERROR_TYPE.NETWORK_ERROR) {
    if (isAccountLinked) return <Spinner />;
    return (
      <div className="h-full md:h-[calc(100%-64px)]">
        <Notify
          className="flex flex-col items-center justify-center"
          message={TEXT.PAYMENT_QR_CODE_ERROR}
          onClick={handleRetry}
          isLoading={isLoading && netWorkError !== ERROR_TYPE.NETWORK_ERROR}
        />
      </div>
    );
  }

  return (
    <div className="md:max-w-[59%] max-w-[70%] md:text-lg mx-auto text-center">
      <p>{TEXT.PAYMENT_BY}</p>
      <p className="pb-2">
        Ví điện tử <span className="pl-1">{paymentName}</span>
      </p>
      <div className="max-w-[300px] mx-auto lg:min-h-[300px]">
        <Image
          src={QRImage || IMAGES.DEFAULT_BANNER_16x9}
          alt={`QR Code ${paymentName}`}
        />
      </div>
      <p className="pt-2">
        {TEXT.PAYMENT_EXPIRE_IN}
        <span className="pl-1 font-montserratBold">{`${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`}</span>
      </p>
      <div className="flex w-full justify-center items-center space-x-2 pt-4">
        <Button
          variant="outline"
          className="w-1/2 rounded-xl text-primary border-primary text-base transition hover:opacity-80"
          onClick={handleBack}
        >
          {TEXT.BACK}
        </Button>
      </div>
    </div>
  );
};

export default memo(QRCode);
