import React from "react";
import styles from "./Style.module.scss";
import { STATUS_TRANSACTION, TEXT, VieON_URL } from "../../utils/constants";
import { Button } from "../../components/ui/Button";
import Image from "../../components/ui/Image";
import { useNavigate } from "react-router-dom";
import ConfigLocalStorage from "../../utils/config/ConfigLocalStorage";
import LocalStorage from "../../utils/config/LocalStorage";
import { cn, pathname } from "../../utils/helper";

const ResultFrame = ({
  src,
  title,
  children,
  className,
  status,
  imageClass,
}: {
  src: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  status?: any;
  imageClass?: string;
}) => {
  const navigate = useNavigate();
  const handleClickContinueWatching = () => {
    window.location.href = VieON_URL;
  };
  const handleClickRetry = () => {
    navigate(`${pathname}`);
    ConfigLocalStorage.remove(LocalStorage.token);
  };

  return (
    <article className={className || styles.blockProcess}>
      <div className={styles.maskPro}>
        <div className={styles.inner}>
          <div className={cn(styles.img, imageClass)}>
            <Image src={src} alt={title} />
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <h2 className={styles.blockTittle}>{title}</h2>
      </div>

      <div className={styles.blockBody}>
        {children}
        <div
          className={
            status === STATUS_TRANSACTION.FAILED
              ? styles.buttonGroupFail
              : styles.buttonGroup
          }
        >
          {status === STATUS_TRANSACTION.FAILED ? (
            <>
              <Button
                className={styles.buttonOutline}
                onClick={handleClickContinueWatching}
                title={TEXT.CONTINUE_WATCH_VieON}
              >
                <span>{TEXT.CONTINUE_WATCH_VieON}</span>
              </Button>
              <Button
                className={styles.buttonSuccess}
                title={TEXT.RETRY}
                onClick={handleClickRetry}
              >
                <span>{TEXT.RETRY}</span>
              </Button>
            </>
          ) : (
            <Button
              className={styles.buttonSuccess}
              onClick={handleClickContinueWatching}
              title={TEXT.CONTINUE_WATCH_VieON}
            >
              <span>{TEXT.CONTINUE_WATCH_VieON}</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default React.memo(ResultFrame);
