import { Button } from "../../components/ui/Button";
import Image from "../../components/ui/Image";
import { cn } from "../../utils/helper";
import styles from "./Style.module.scss";
import { Input } from "../../components/ui/Input";
import { Controller, useForm } from "react-hook-form";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";
import {
  changePhoneNumber,
  checkSegment,
  setPhoneNumber,
} from "../../state/features/paymentSlice";
import {
  CARD_CREDIT,
  ERROR_CODE,
  IMAGES,
  MESSAGES,
  PLACEHOLDER,
  POPUP_NAME,
  REGEX,
  STATUS_CODE,
  STEP,
  TEXT,
} from "../../utils/constants";
import { isMobile } from "react-device-detect";
import ConfigLocalStorage from "../../utils/config/ConfigLocalStorage";
import LocalStorage from "../../utils/config/LocalStorage";
import { toast } from "react-toastify";
import { setPopup } from "../../state/features/popupSlice";
import { checkStatusExpriedCampaign } from "../../models/Transaction";
import React from "react";

type TokenInfoProps = {
  code: number;
  result: {
    token: string;
  };
};

const PromotionInfo = () => {
  const [isPhoneFilled, setPhoneFilled] = useState<boolean>(false);
  const [submissionTimes, setSubmissionTimes] = useState<Date[]>([]);
  const [error, setError] = useState("");
  const [spamDetected, setSpamDetected] = useState(false);

  const dispatch = useAppDispatch();
  const phone = useAppSelector(
    (state: RootState) => state.payment?.phoneNumber
  );
  const [phoneNumber, setPhoneNumberState] = useState(phone || "");
  const { isLoading, tokenInfo, step } = useAppSelector(
    (state: RootState) => state.payment
  );
  const { data } = useAppSelector((state) => state.campaign);
  const {
    tag_line: tagLine,
    tnc,
    segment,
    promotion_code: promotionCode,
  } = data || {};

  const popupName = useAppSelector((state: RootState) => state.popup.popup);
  const { handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: {
      [CARD_CREDIT.PHONE_NUMBER]: phone || "",
    },
  });

  const isDisabled = useMemo(
    () =>
      phoneNumber?.length < 10 ||
      (!!error && tokenInfo?.code !== ERROR_CODE.CODE_3) ||
      (!isMobile && step === STEP.CREATE_TRANSACTION) ||
      isLoading ||
      spamDetected,
    [phoneNumber, error, tokenInfo, step, isLoading, spamDetected, isMobile]
  );

  const checkForSpam = () => {
    const recentSubmissions = submissionTimes.filter(
      (time) => new Date().getTime() - time.getTime() < 60000
    );

    if (recentSubmissions.length > 2) {
      setError(MESSAGES.SPAM_INPUT);
      setSpamDetected(true);
      return true;
    }

    return false;
  };
  const handleSubmitForm = async () => {
    if (!isPhoneFilled) {
      if (checkForSpam()) return;
      if (await checkStatusExpriedCampaign(dispatch)) return;
      setSubmissionTimes([...submissionTimes, new Date()]);

      await dispatch(
        checkSegment({
          mobile: phoneNumber,
          segment_code: segment,
          code: promotionCode,
        })
      );
    } else {
      setPhoneFilled(false);
      dispatch(changePhoneNumber());
      ConfigLocalStorage.remove(LocalStorage.token);
      setPhoneNumberState("");
    }
  };

  const handleTokenResponse = (info: TokenInfoProps) => {
    switch (info.code) {
      case ERROR_CODE.CODE_0:
        ConfigLocalStorage.set(LocalStorage.token, info.result.token);
        break;
      case ERROR_CODE.CODE_1:
      case STATUS_CODE.CODE_429:
        setError(MESSAGES.OCURRED_ERROR);
        break;
      case ERROR_CODE.CODE_2:
        setError(MESSAGES.INVALID_PHONE_NUMBER);
        break;
      case ERROR_CODE.CODE_3:
        setError(MESSAGES.OUT_OF_TARGET);
        setPhoneFilled(true);
        break;
      case ERROR_CODE.CODE_4:
        dispatch(setPopup({ name: POPUP_NAME.PHONE_NUMBER_USED }));
        break;
      case ERROR_CODE.CODE_5:
        toast.error(MESSAGES.FAIL_TO_GET_USER_INFO);
        break;
      default:
        break;
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhoneNumberState(value);
    if (!!value) {
      setError("");
    }
  };

  const handlePhoneBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValidPhoneNumber = REGEX.PHONE_NUMBER.test(value);

    if (!!value) {
      if (value.length !== 10) {
        setError(MESSAGES.SPECIFIC_10_DIGITS);
      } else if (!isValidPhoneNumber) {
        setError(MESSAGES.INVALID_PHONE_NUMBER);
      } else {
        setError("");
      }
    }
  };

  useEffect(() => {
    if (tokenInfo) {
      handleTokenResponse(tokenInfo);
    }
  }, [tokenInfo]);

  useEffect(() => {
    if (!phoneNumber && !!error) {
      setError("");
    }
  }, [phoneNumber, error]);

  useEffect(() => {
    if (tokenInfo?.code === ERROR_CODE.CODE_0) {
      setPhoneFilled(true);
      dispatch(setPhoneNumber(phoneNumber));
    }
  }, [phoneNumber, tokenInfo]);

  useEffect(() => {
    if (!popupName) {
      setPhoneNumberState("");
    }
  }, [popupName]);

  useEffect(() => {
    let timer: any = null;

    if (spamDetected) {
      timer = setTimeout(() => {
        setSpamDetected(false);
        setError("");
      }, 60000);
    }

    return () => clearTimeout(timer);
  }, [spamDetected]);

  return (
    <div className={styles["promotion-info"]}>
      {!isMobile && (
        <div className="lg:max-h-[205px] max-h-[175px] overflow-hidden">
          <Image src={tagLine || IMAGES.BANNER} alt="promotion" />
        </div>
      )}
      <form
        className="pb-[27px] lg:pb-8 lg:pt-6 2xl:pt-8 my-2 xl:w-[73%] md:px-3 px-1 w-full mx-auto"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="flex relative items-center">
          <Controller
            name={CARD_CREDIT.PHONE_NUMBER}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id={CARD_CREDIT.PHONE_NUMBER}
                placeholder={PLACEHOLDER.TYPE_PHONE_NUMBER}
                value={phone || phoneNumber}
                onChange={(e) => handlePhoneChange(e)}
                onBlur={(e) => handlePhoneBlur(e)}
                className={cn(
                  styles["input-custom"],
                  "md:placeholder:text-base placeholder:text-sm hover:placeholder:text-white transition",
                  isPhoneFilled || !phone
                    ? "border-[#ccc] placeholder:text-[#ccc] text-[#ccc]"
                    : "border-white placeholder:text-white text-white"
                )}
                disabled={isPhoneFilled}
                type="number"
              />
            )}
          />
          <Button
            variant="primary"
            type="submit"
            className={styles["button-custom"]}
            disabled={isDisabled}
          >
            {isPhoneFilled ? TEXT.CHANGE_PHONE : TEXT.CONFIRM}
            <div className={cn(styles.icon, isDisabled ? styles.disabled : "")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke={cn(isDisabled ? "#565656" : "#001f00")}
                className="w-4 h-4 lg:w-6 lg:h-6 pl-[2px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </Button>
          {error && (
            <p className="text-[#F00] text-xs lg:text-[16px] pt-2 absolute top-full left-0 w-full lg:leading-5">
              {error}
            </p>
          )}
        </div>
      </form>
      <div
        className={cn(
          styles.list,
          styles["scrollbar-custom"],
          "scrollbar-custom"
        )}
        dangerouslySetInnerHTML={{ __html: tnc || "" }}
      />
    </div>
  );
};

export default memo(PromotionInfo);
