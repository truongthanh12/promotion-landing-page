import { cn, formatCurrency } from "../../utils/helper";
import React, { memo } from "react";

const Currency = ({ price, fontSizeClass }: { price: number, fontSizeClass?: string }) => {
  return (
    <div className={cn("flex items-center text-primary text-2xl font-montserratMedium", fontSizeClass)}>
      {formatCurrency(price)}
      <pre className="underline pl-1">đ</pre>
    </div>
  );
};

export default memo(Currency);
