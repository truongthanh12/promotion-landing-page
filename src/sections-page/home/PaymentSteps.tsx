import TermStep from "../../components/Package";
import MethodStep from "../../components/Method";
import PaymentMethods from "../../components/PaymentMethods";
import { Button } from "../../components/ui/Button";
import { Fragment, memo, useEffect, useRef } from "react";
import { RootState } from "../../state/store";
import { useAppSelector } from "../../state/hooks";
import { cn } from "../../utils/helper";
import { isMobile } from "react-device-detect";
import { PAYMENT_METHOD, STEP, TEXT } from "../../utils/constants";
import { PackageItem } from "../../models/package";
import { useDispatch } from "react-redux";
import {
  setMethodSelected,
  setPackageSelected,
  setStep,
} from "../../state/features/paymentSlice";
import { MethodItem } from "../../models/method";
import React from "react";

const PaymentSteps = () => {
  const { phoneNumber, packageSelected, methodSelected, step } = useAppSelector(
    (state: RootState) => state.payment
  );
  const { packages } = useAppSelector((state: RootState) => state.packages);
  const { data } = useAppSelector((state: RootState) => state.campaign);
  const { methods } = data || {};
  const termRef = useRef<HTMLDivElement | null>(null);
  const methodRef = useRef<HTMLDivElement | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const handleBack = () => dispatch(setStep(step - 1));
  const handleNextStep = () => {
    dispatch(setStep(step + 1));
  };

  const handleScroll = (destinationRef: HTMLDivElement) => {
    if (isMobile && destinationRef) {
      window.scrollTo({
        top: destinationRef.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };
  const handleSelectMethod = (item: MethodItem) => {
    dispatch(setMethodSelected(item));
    if (isMobile) {
      dispatch(setStep(STEP.CREATE_TRANSACTION));
    }
    setTimeout(() => {
      handleScroll(paymentRef.current as HTMLDivElement);
    }, 200);
  };

  // handle term package
  const handleSelectPackage = (item: PackageItem) => {
    dispatch(setPackageSelected(item));
    handleScroll(methodRef.current as HTMLDivElement);
  };
  useEffect(() => {
    if (packages?.[0] && !packageSelected) {
      dispatch(setPackageSelected(packages?.[0]));
    }
  }, [packages?.[0], packageSelected]);

  useEffect(() => {
    if (step === STEP.CREATE_TRANSACTION && !phoneNumber) {
      handleBack();
    }
  }, [step, phoneNumber]);

  useEffect(() => {
    if (phoneNumber && isMobile) {
      setTimeout(() => {
        handleScroll(termRef.current as HTMLDivElement);
      }, 200);
    }
  }, [isMobile, phoneNumber]);

  const renderMethods = () => (
    <div className="flex-shrink-0 flex-grow-0 w-full overflow-hidden relative">
      <div className="md:pl-2 md:pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
        {methods?.map((methodItem: MethodItem) => {
          const isDisabled = !methodItem.enableTermList.includes(
            packageSelected?.id
          );
          if (isDisabled) return null;
          return (
            <MethodStep
              isDisabled={isDisabled}
              key={methodItem.id}
              methodItem={methodItem}
              onClick={() => handleSelectMethod(methodItem)}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <Fragment>
      <div
        id="term"
        className={cn(
          "lg:p-3 p-2 bg-[#F5F5F5] rounded-xl text-black relative flex flex-col mt-4 md:mt-1",
          phoneNumber ? "" : "mask-blocked"
        )}
        ref={termRef}
      >
        <h1 className="font-montserratBold md:text-2xl pt-2 flex-none z-10 md:pl-3">
          {step === STEP.TERM
            ? TEXT.CHOOSE_TERM_PACKAGE
            : step === STEP.METHOD
              ? TEXT.CHOOSE_PAYMENT
              : TEXT.PAYMENT}
        </h1>
        <div className="mb-4 overflow-hidden flex-auto mt-3">
          <div
            className="flex transition-transform duration-300 h-full"
            style={
              !isMobile ? { transform: `translateX(-${step * 100}%)` } : {}
            }
          >
            <div className="flex-shrink-0 flex-grow-0 w-full overflow-hidden relative">
              {packages.map((packageItem: PackageItem) => {
                return (
                  <TermStep
                    handleSelectPackage={() => handleSelectPackage(packageItem)}
                    key={packageItem.id}
                    packageItem={packageItem}
                    checked={packageSelected?.id === packageItem.id}
                  />
                );
              })}
            </div>
            {!isMobile && (
              <>
                {renderMethods()}
                <div className="flex-shrink-0 flex-grow-0 w-full overflow-hidden relative">
                  <PaymentMethods id={methodSelected?.id} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <NavigateButtons
            phoneNumber={phoneNumber}
            step={step}
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            methodSelected={methodSelected}
          />
        </div>
      </div>
      {isMobile && (
        <>
          <MobileMethodSection
            phoneNumber={phoneNumber}
            methodSelected={methodSelected}
            methodRef={methodRef}
            renderMethods={renderMethods}
          />
          <MobilePaymentSection
            phoneNumber={phoneNumber}
            step={step}
            methodSelected={methodSelected}
            paymentRef={paymentRef}
          />
        </>
      )}
    </Fragment>
  );
};

export default memo(PaymentSteps);

export const MobileMethodSection = (props: any) => {
  const { phoneNumber, methodSelected, methodRef, renderMethods } = props;
  return (
    <div
      id="method"
      className={cn(
        "lg:p-3 p-2 bg-[#F5F5F5] rounded-xl text-black relative flex flex-col mt-4 md:mt-1",
        phoneNumber ? "" : "mask-blocked"
      )}
      ref={methodRef}
    >
      <h2 className="font-montserratBold md:text-2xl pt-2 flex-none z-10 md:pl-3">
        {TEXT.CHOOSE_PAYMENT}
      </h2>
      <div className="mb-4 overflow-hidden flex-auto h-full mt-3 md:mt-0">
        <div className="flex h-full">
          {renderMethods()}
          {(methodSelected?.id === PAYMENT_METHOD.SHOPEE_PAY ||
            methodSelected?.id === PAYMENT_METHOD.MOMO ||
            methodSelected?.id === PAYMENT_METHOD.VIETTEL_PAY ||
            methodSelected?.id === PAYMENT_METHOD.ZALO_PAY) && (
            <div className="flex-shrink-0 flex-grow-0 w-full overflow-hidden relative">
              <PaymentMethods id={methodSelected?.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MobilePaymentSection = (props: any) => {
  const { phoneNumber, step, methodSelected, paymentRef } = props;
  return (
    <>
      {step === STEP.CREATE_TRANSACTION &&
        (methodSelected?.id === PAYMENT_METHOD.ASIAPAY ||
          methodSelected?.id === PAYMENT_METHOD.VN_PAY) && (
          <div
            id="payment"
            className={cn(
              "lg:p-4 p-3 bg-[#F5F5F5] rounded-xl text-black relative h-full flex flex-col mt-4 md:mt-1",
              phoneNumber ? "" : "mask-blocked"
            )}
            ref={paymentRef}
          >
            <h2 className="font-montserratBold md:text-2xl pt-2 flex-none z-10 md:pl-3">
              {methodSelected?.id === PAYMENT_METHOD.VN_PAY
                ? TEXT.SELECT_BANK
                : TEXT.PAYMENT}
            </h2>
            <div className="mb-4 overflow-hidden flex-auto h-full mt-3 md:mt-0">
              <div className="flex h-full">
                <div className="flex-shrink-0 flex-grow-0 w-full overflow-hidden relative">
                  <PaymentMethods id={methodSelected?.id} />
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export const NavigateButtons = (props: any) => {
  const { phoneNumber, step, handleNextStep, handleBack, methodSelected } =
    props;
  return (
    <div className="2xl:w-[calc(50%+60px)] w-3/4 z-10 flex justify-center items-center space-x-2">
      {step !== STEP.TERM && !isMobile && step !== STEP.CREATE_TRANSACTION && (
        <Button
          onClick={handleBack}
          variant="outline"
          className="w-1/2 rounded-xl text-primary border-primary transition hover:opacity-80"
          disabled={!phoneNumber}
        >
          {TEXT.BACK}
        </Button>
      )}
      {step !== STEP.CREATE_TRANSACTION && !isMobile && (
        <Button
          onClick={handleNextStep}
          variant="primary"
          className="!w-1/2 !h-auto rounded-xl hover:bg-opacity-75 transition"
          disabled={
            !phoneNumber || step === STEP.METHOD ? !methodSelected?.id : false
          }
        >
          {TEXT.NEXT}
        </Button>
      )}
    </div>
  );
};
