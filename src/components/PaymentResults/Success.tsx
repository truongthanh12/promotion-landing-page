import { IMAGES, TEXT } from "../../utils/constants";
import PaymentFrame from "../../components/PaymentResults/Frame";
import React from "react";
import styles from "./Style.module.scss";
import Currency from "../Currency";
import { cn } from "../../utils/helper";

const Success = ({ data }: { data: any }) => {
  const {
    txnRef,
    amount,
    orderId,
    expiryDate,
    packageName,
    displayDuration,
    effectiveDate,
      recurring,
    nextPaymentTerm
  } = data || {};
  return (
    <PaymentFrame
      title={TEXT.TRANSACTION_SUCCESS}
      src={IMAGES.CAT_SUCCESS}
      className={styles.blockSuccessFail}
    >
      <>
        <div className={styles.groupListSuccess}>
          <div className={styles.left}>
            <span className={styles.infoGroup}>{TEXT.TRANSACTION_CODE}</span>
          </div>
          <div className={styles.right}>
            <div className={styles.textContentSuccess}>{`#${
              txnRef || orderId
            }`}</div>
          </div>
        </div>
        <div className={styles.groupListSuccess}>
          <div className={styles.left}>
            <span className={styles.infoGroup}>{TEXT.PACKAGE_NAME}</span>
          </div>
          <div className={styles.right}>
            <div className={styles.textContentSuccess}>{packageName}</div>
          </div>
        </div>
        <div className={styles.groupListSuccess}>
          <div className={styles.left}>
            <span className={styles.infoGroup}>{TEXT.PACKAGE_TERM}</span>
          </div>
          <div className={styles.right}>
            <div className={styles.textContentSuccess}>{displayDuration}</div>
          </div>
        </div>
        <div className={styles.listGroup}>
          <div className={styles.groupListSuccess}>
            <div className={styles.left}>
              <span className={styles.infoGroup}>
                {TEXT.PACKAGE_VALID_DATE}
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.textContentSuccess}>{effectiveDate}</div>
            </div>
          </div>
          <div className={styles.groupListSuccess}>
            <div className={styles.left}>
              <span className={styles.infoGroup}>
                {TEXT.PACKAGE_EXPIRE_DATE}
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.textContentSuccess}>{expiryDate}</div>
            </div>
          </div>
          {recurring && <div className={styles.groupListSuccess}>
            <div className={styles.left}>
              <span className={styles.infoGroup}>
                {TEXT.PACKAGE_NEXT_PAYMENT_TERM}
              </span>
            </div>
            <div className={styles.right}>
              <div className={styles.textContentSuccess}>{nextPaymentTerm}</div>
            </div>
          </div>}

        </div>
        <div className="flex justify-between py-1 lg:py-3">
          <div className={styles.middle}>
            <span className={cn(styles.infoGroup, "lg:font-montserratBold")}>
              {TEXT.PACKAGE_TOTAL_PRICE}
            </span>
          </div>
          <div className={cn(styles.textContentSuccess)}>
            <Currency
              fontSizeClass="text-[28px] lg:text-[48px]"
              price={amount}
            />
          </div>
        </div>
      </>
    </PaymentFrame>
  );
};

export default React.memo(Success);
