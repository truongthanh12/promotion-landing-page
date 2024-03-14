import styles from "./Style.module.scss";
import Image from "../ui/Image";
import { cn } from "../../utils/helper";
import { MethodItem } from "../../models/method";
import React from "react";
import { useAppSelector } from "../../state/hooks";

interface MethodProps {
  onClick: () => void;
  methodItem: MethodItem;
  isDisabled: boolean;
}
const Method = ({ onClick, methodItem, isDisabled }: MethodProps) => {
  const { title, icon, id } = methodItem || {};
  const { methodSelected } = useAppSelector((state) => state.payment || {});
  return (
    <div
      className={cn(
        styles["payment-method"],
        "w-[calc(50%-8px)] lg:w-[calc(33.33%-12px)]",
        isDisabled ? "mask-blocked relative before:z-10 before:rounded" : "",
        methodSelected?.id === id ? styles.active : ""
      )}
      onClick={onClick}
    >
      <div className={styles.box}>
        <Image src={icon} alt={title} />
      </div>
      <div className={cn(styles.title, "line-clamp3")}>{title}</div>
    </div>
  );
};

export default React.memo(Method);
