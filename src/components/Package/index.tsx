import styles from "./Style.module.scss";
import { cn, formatCurrency } from "../../utils/helper";
import Currency from "../Currency";
import { PackageItem } from "../../models/package";
import React from "react";

interface PackageProps {
  packageItem: PackageItem;
  checked: boolean;
  handleSelectPackage: (item: PackageItem) => void;
}
const Package: React.FC<PackageProps> = ({
  packageItem,
  checked,
  handleSelectPackage,
}) => {
  if (!packageItem) {
    return null;
  }
  const { name, price, id, old_price, description } = packageItem || {};

  return (
    <div className={styles.package}>
      <input
        id={String(id)}
        type="radio"
        name="default-radio"
        className="hidden"
        checked={checked}
        onChange={() => handleSelectPackage(packageItem)}
      />
      <label htmlFor={String(id)} className={styles["radio-group"]}>
        <div className="flex items-center">
          <span className={styles.radio} />
          <div>
            <div className={cn(styles.title, "line-clamp2")}>{name}</div>
            {description && <div className="text-xs">{description}</div>}
          </div>
        </div>
        <div className="flex items-center">
          <div className="md:pl-1 flex flex-col items-end">
            <div className={styles.price}>
              <Currency
                price={price || 0}
                fontSizeClass="md:text-2xl text-[18px]"
              />
            </div>
            {(old_price || 0) > (price || 0) && (
              <div className={styles["old-price"]}>
                {formatCurrency(old_price)} <>đ</>
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default Package;
