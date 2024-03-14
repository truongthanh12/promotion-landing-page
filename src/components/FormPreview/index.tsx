import { cn } from "../../utils/helper";
import Currency from "../Currency";
import styles from "./Style.module.scss";
import React, { memo } from "react";
import { IMAGES, TEXT } from "../../utils/constants";
import { Button } from "../ui/Button";
import { isMobile } from "react-device-detect";
import Image from "../ui/Image";

type FormPreviewProps = {
  accountName: string;
  packageName: string;
  packageTerm: string;
  validDate: string;
  expireDate: string;
  nextPaymentTerm: string;
  price: number;
  recurring: number;
  onClick: (e: any) => void;
  disabled: boolean;
};
const FormPreview = ({
  accountName,
  packageName,
  packageTerm,
  validDate,
  expireDate,
  nextPaymentTerm,
  price,
  recurring,
  onClick,
  disabled,
}: FormPreviewProps) => {
  return (
    <>
      <div className="border-bottom">
        <div className={styles.box}>
          <div className={styles["box-item"]}>
            <span>{TEXT.ACCOUNT_NAME}</span>
            <span className={cn(styles.text, "tracking-wider")}>
              {accountName}
            </span>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles["box-item"]}>
            <span>{TEXT.PACKAGE_NAME}</span>
            <span className={styles.text}>{packageName}</span>
          </div>
          <div className={cn(styles["box-item"], "pt-2")}>
            <span>{TEXT.PACKAGE_TERM}</span>
            <span className={styles.text}>{packageTerm}</span>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles["box-item"]}>
            <span>{TEXT.PACKAGE_VALID_DATE}</span>
            <span className={styles.text}>{validDate}</span>
          </div>
          <div className={cn(styles["box-item"], "pt-2")}>
            <span>{TEXT.PACKAGE_EXPIRE_DATE}</span>
            <span className={styles.text}>
              {recurring ? TEXT.WHEN_CANCLE : expireDate}
            </span>
          </div>
          {recurring ? (
            <div className={cn(styles["box-item"], "pt-1")}>
              <span>{TEXT.PACKAGE_NEXT_PAYMENT_TERM}</span>
              <span className={styles.text}>{nextPaymentTerm}</span>
            </div>
          ) : null}
        </div>

        <div className={styles.box}>
          <div className={styles["box-item"]}>
            <span>{TEXT.PACKAGE_TOTAL_PRICE}</span>
            <span className={cn(styles.text, "ml-auto")}>
              <Currency price={price} fontSizeClass="md:text-[28px]" />
            </span>
          </div>
        </div>
        <div
          className={styles["small-text"]}
          dangerouslySetInnerHTML={{ __html: TEXT.TERM_TO_USE }}
        />
      </div>

      {isMobile && (
        <Button
          disabled={disabled}
          onClick={onClick}
          type="submit"
          variant="primary"
          className="text-white transition flex justify-center mx-auto items-center md:h-14 md:w-64 h-12"
        >
          {TEXT.PAYMENT}
        </Button>
      )}

      <div className="grid grid-cols-4 lg:grid-cols-5 pt-2 md:pt-0">
        <div className="col-span-1 mr-2 lg:mr-4">
          <Image
            src={IMAGES.LOGO_PCIDSS}
            alt="VALIDATION OF COMPLIANCE - PCI-SAQ"
          />
        </div>
        <div className="col-span-3 lg:text-sm text-[#646464FF] text-[13px]">
          {TEXT.PCIDSS_CONTENT}
        </div>
      </div>
    </>
  );
};

export default memo(FormPreview);
