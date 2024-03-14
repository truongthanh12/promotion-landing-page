import PaymentFrame from "../../components/PaymentResults/Frame";
import React from "react";
import styles from "./Style.module.scss";
import { IMAGES, TEXT, VieON_TEL } from "../../utils/constants";

const Processing = ({
  orderId,
  tel,
  name,
}: {
  orderId: string;
  tel: string;
  name: string;
}) => {
  return (
    <PaymentFrame
      title={TEXT.PROCESSING_TRANSACTION_TITLE}
      src={IMAGES.CAT_PROCESSING}
    >
      <div className={styles.process}>
        <div className={styles.listGroup}>
          <div className={styles.textContentPro}>
            <span className={styles.textNomal}>{TEXT.TRANSACTION_CODE}: </span>
            <span className={styles.textNomal}>{`#${orderId}`}</span>
          </div>
          <div className={styles.textContentPro}>
            Giao dịch này mất nhiều thời gian để xử lý. <br />
            Kết quả giao dịch sẽ được cập nhật sau 24 giờ làm việc tại
            <span className={styles.textNomal}>
              Tài khoản / Gói dịch vụ / Lịch sử giao dịch.
            </span>
          </div>
        </div>
        <div className={styles.process}>
          <div className={styles.textContentPro}>
            Vui lòng liên hệ hotline VieON (miễn phí)
            <a
              className={styles.textHighlight}
              href={`tel:${VieON_TEL}`}
              title={VieON_TEL}
            >
              {VieON_TEL}
            </a>
            {tel ? (
              <>
                hoặc hotline {name}
                <a
                  className={styles.textHighlight}
                  href={`tel:${tel}`}
                  title={tel}
                >
                  {tel}
                </a>
              </>
            ) : (
              ""
            )}
            để được hỗ trợ
          </div>
        </div>
      </div>
    </PaymentFrame>
  );
};

export default React.memo(Processing);
