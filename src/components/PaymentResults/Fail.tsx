import React from "react";
import PaymentFrame from "../../components/PaymentResults/Frame";
import styles from "./Style.module.scss";
import { IMAGES, TEXT, VieON_TEL } from "../../utils/constants";

const Fail = ({
  data,
  status,
  orderId,
  error,
  tel,
  name,
}: {
  data: any;
  error: any;
  status: any;
  orderId: string;
  tel: string;
  name: string;
}) => {
  const { txnRef, errorCode, errorString } = data || {};
  const { code } = error || {};

  const contactNote = tel
    ? `Vui lòng liên hệ hotline VieON (miễn phí) <a class='text-primary font-montserratBold' href=${`tel:${VieON_TEL}`}>${VieON_TEL}</a> hoặc hotline ${name} <a class='text-primary font-montserratBold' href=${`tel:${tel}`}>${tel}</a> để được hỗ trợ.`
    : `Vui lòng liên hệ hotline VieON (miễn phí) <a class='text-primary font-montserratBold' href=${`tel:${VieON_TEL}`}>${VieON_TEL}</a> để được hỗ trợ.`;
  return (
    <PaymentFrame
      status={status}
      title={TEXT.UNSUCCESSFULLY_BUY_TITLE}
      src={IMAGES.CAT_FAILED}
      className={styles.blockSuccessFail}
      imageClass="!h-full pb-2"
    >
      <div className={styles.listGroupFailed}>
        <div className={styles.itemFailed}>
          <div className={styles.infoGroupFailed}>
            <div className={styles.left}>
              <span className={styles.textNomal}>{TEXT.TRANSACTION_CODE}</span>
            </div>
            <div className={styles.right}>
              <div className={styles.textContent}>{`#${
                txnRef || orderId
              }`}</div>
            </div>
          </div>
          <div className={styles.infoGroupFailed}>
            <div className={styles.left}>
              <span className={styles.textNomal}>{TEXT.ERROR_CODE}</span>
            </div>
            <div className={styles.right}>
              <div className={styles.textContent}>
                {errorCode || code || "-"}
              </div>
            </div>
          </div>
          <div className={styles.infoGroupFailed}>
            <div className={styles.left}>
              <span className={styles.textNomal}>{TEXT.ERROR}</span>
            </div>
            <div className={styles.right}>
              <div className={styles.textContent}>{errorString || "-"}</div>
            </div>
          </div>
        </div>
        <div className={styles.listGroupFailed}>
          <div
            className={styles.noteFailed}
            dangerouslySetInnerHTML={{ __html: contactNote }}
          />
        </div>
      </div>
    </PaymentFrame>
  );
};

export default React.memo(Fail);
