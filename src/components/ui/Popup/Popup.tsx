import React from "react";
import styles from "./Style.module.scss";
import { cn } from "../../../utils/helper";

type PopupProps = {
  children: React.ReactNode;
  className?: string;
};
const Popup = React.forwardRef<HTMLDivElement, PopupProps>(
  ({ children, className }, ref) => {
    return (
      <div id="popup" className={styles.popup}>
        <div className={styles.wrapper}>
          <div ref={ref} className={styles.box}>
            <div className={cn(styles["extra-box"], className)}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default React.memo(Popup);
