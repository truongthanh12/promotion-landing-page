import React, { memo, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FloatingLabelInput from "../ui/Input/FloatingLabelInput";
import { Button } from "../ui/Button";
import {
  formatCardDate,
  formatCardNumber,
  parseJwt,
  validateCardExpired,
  validateCardNumber,
} from "../../utils/helper";
import {
  CARD_CREDIT,
  ERROR_TYPE,
  MESSAGES,
  STEP,
  TEXT,
} from "../../utils/constants";
import { resetAsiaPayData, setInfoData } from "../../state/features/asiaPaySlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import ConfigLocalStorage from "../../utils/config/ConfigLocalStorage";
import LocalStorage from "../../utils/config/LocalStorage";
import { isMobile } from "react-device-detect";
import { setLoading } from "../../state/features/appSlice";
import AsiaPayCheckout from "../../hooks/AsiaPayFunction";
import Notify from "./Notify";
import { setStep } from "../../state/features/paymentSlice";

const FormSchema = z.object({
  cardNumber: z.string().refine(
    (value) => {
      if (value.length === 0 || value.length < 16) {
        return true;
      }

      const { validatedError } = validateCardNumber(value);
      return !validatedError;
    },
    { message: MESSAGES.VALIDATED_CARD_NUMBER }
  ),
  cardName: z.string(),
  cardValidDate: z.string().refine(
    (value) => {
      return value.length > 3 && validateCardExpired(value);
    },
    { message: MESSAGES.VALIDATED_CARD_EXPIRED }
  ),
  cardCVVCVC: z.string().length(3, ""),
});

const AsiaPay = () => {
  const [formattedCardNumber, setFormattedCardNumber] = useState("");
  const [userId, setUserId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.asiapay);
  const { typeError, step } = useAppSelector((state) => state.payment);

  const { handleSubmitForm } = AsiaPayCheckout({ userId });

  useEffect(() => {
    const tokenResponse = ConfigLocalStorage.get(LocalStorage.token);
    const token: string =
      typeof tokenResponse === "string" || tokenResponse === undefined
        ? tokenResponse
        : "";
    const decoded = parseJwt(token);
    if (decoded) {
      setUserId(decoded.id || decoded.sub);
    }
  }, []);

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      cardValidDate: "",
      cardCVVCVC: "",
    },
    mode: "onBlur",
  });

  const handleInputChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    switch (field) {
      case CARD_CREDIT.CARD_NUMBER:
        const formattedCardNumber = formatCardNumber(value);
        setFormattedCardNumber(formattedCardNumber);
        if (value.length === 0 || errors.cardNumber) {
          clearErrors(CARD_CREDIT.CARD_NUMBER);
        }
        value = formattedCardNumber.replace(/\s+/g, "");
        break;
      case CARD_CREDIT.CARD_VALID_DATE:
        value = formatCardDate(value);
        break;
      case CARD_CREDIT.CARD_CVV:
        value = value.substring(0, 3);
        break;
      default:
        break;
    }

    setValue(field as keyof z.infer<typeof FormSchema>, value, {
      shouldValidate: true,
    });
    if (isMobile) {
      dispatch(setInfoData({ [field]: value }));
    }
  };

  const handleCardNameBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.trim().replace(/\s+/g, " ");
    setValue(CARD_CREDIT.CARD_NAME, value, { shouldValidate: true });
    if (isMobile) {
      dispatch(setInfoData({ [CARD_CREDIT.CARD_NAME]: value }));
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    handleSubmitForm(data);
  };

  const handleValidateCardDateBlur = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (value?.length === 0) {
      clearErrors(CARD_CREDIT.CARD_VALID_DATE);
    }
  };

  const handleChangeCardCVV = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value.replace(
      /[^0-9]/g,
      ""
    );
    if (isMobile) {
      dispatch(
        setInfoData({ [CARD_CREDIT.CARD_CVV]: event.currentTarget.value })
      );
    }
  };

  const handleRetry = () => {
    dispatch(resetAsiaPayData());
  };

  const handleBack = () => {
    dispatch(setStep(STEP.METHOD));
  };

  useEffect(() => {
    if (step !== STEP.CREATE_TRANSACTION) {
      reset();
      dispatch(resetAsiaPayData());
      setFormattedCardNumber("");
      clearErrors();
    }
  }, [step]);

  useEffect(() => {
    if (isMobile && isLoading) dispatch(setLoading(isLoading));
    return () => {
      if (isMobile) dispatch(setLoading(false));
    };
  }, [isLoading, isMobile]);

  useEffect(() => {
    if (!formattedCardNumber && step === STEP.CREATE_TRANSACTION) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [formattedCardNumber, step]);

  if (error?.code || typeError === ERROR_TYPE.NETWORK_ERROR) {
    return (
      <div className="h-full md:h-[calc(100%-64px)]">
        <Notify
          className="flex flex-col items-center justify-center"
          message={TEXT.PAYMENT_QR_CODE_ERROR}
          onClick={handleRetry}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 px-3 text-[#646464] h-full flex flex-col justify-center"
    >
      <Controller
        name={CARD_CREDIT.CARD_NUMBER}
        control={control}
        render={({ field }) => (
          <FloatingLabelInput
            {...field}
            ref={inputRef}
            id={CARD_CREDIT.CARD_NUMBER}
            className="text-lg"
            label={TEXT.CARD_NUMBER}
            maxLength={19}
            value={formattedCardNumber}
            message={errors.cardNumber?.message}
            onChange={(e) => handleInputChange(CARD_CREDIT.CARD_NUMBER, e)}
          />
        )}
      />

      <Controller
        name={CARD_CREDIT.CARD_NAME}
        control={control}
        render={({ field }) => (
          <FloatingLabelInput
            {...field}
            id={CARD_CREDIT.CARD_NAME}
            label={TEXT.CARD_NAME}
            className="uppercase text-lg"
            message={errors.cardName?.message}
            onBlur={(e) => handleCardNameBlur(e)}
            type="text"
            onChange={(e) => handleInputChange(CARD_CREDIT.CARD_NAME, e)}
          />
        )}
      />
      <div className="grid grid-cols-3 gap-4 lg:gap-8">
        <div className="col-span-2">
          <Controller
            name={CARD_CREDIT.CARD_VALID_DATE}
            control={control}
            render={({ field }) => (
              <FloatingLabelInput
                {...field}
                id={CARD_CREDIT.CARD_VALID_DATE}
                maxLength={7}
                className="text-lg"
                label={TEXT.CARD_VALID_DATE}
                message={errors.cardValidDate?.message}
                onChange={(e) =>
                  handleInputChange(CARD_CREDIT.CARD_VALID_DATE, e)
                }
                onBlur={(e) => handleValidateCardDateBlur(e)}
              />
            )}
          />
        </div>

        <Controller
          name={CARD_CREDIT.CARD_CVV}
          control={control}
          render={({ field }) => (
            <FloatingLabelInput
              {...field}
              id={CARD_CREDIT.CARD_CVV}
              className="text-lg"
              label={TEXT.CARD_CVV}
              maxLength={3}
              minLength={3}
              onInput={(e) => handleChangeCardCVV(e)}
              onChange={(e) => handleInputChange(CARD_CREDIT.CARD_CVV, e)}
              type="password"
            />
          )}
        />
      </div>
      {!isMobile && (
        <div className="w-full flex justify-center z-10">
          <div className="flex justify-center items-center 2xl:w-[calc(50%+60px)] w-3/4 space-x-2">
            <Button
              variant="outline"
              className="w-1/2 rounded-xl text-primary border-primary text-base transition hover:opacity-80"
              onClick={handleBack}
              type="button"
            >
              {TEXT.BACK}
            </Button>
            <Button
              disabled={!isValid || isLoading || !!error?.code}
              isLoading={isLoading}
              type="submit"
              variant="primary"
              className="!w-1/2 !h-auto rounded-xl"
            >
              {TEXT.PAYMENT}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default memo(AsiaPay);
