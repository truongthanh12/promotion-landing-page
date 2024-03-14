import React, { useEffect, useState } from "react";
import Image from "../ui/Image";
import { getVNPayList } from "../../api";
import { toast } from "react-toastify";
import { MESSAGES } from "../../utils/constants";
import Spinner from "../Spinner";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectedBank } from "../../state/features/vnpaySlice";
import { cn } from "../../utils/helper";

type VNPayBankItem = {
  name: string;
  logo: string;
  code: string;
  id: number;
};
const VNPayBanks = () => {
  const [banks, setBanks] = useState<VNPayBankItem[]>([]);
  const { bankSelected } = useAppSelector((state) => state.vnpay);

  const dispatch = useAppDispatch();
  const itemClass =
    "h-0 pb-[56.25%] relative before:border before:rounded-sm transition before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0";

  const handleSelectBank = (item: VNPayBankItem) => {
    if (bankSelected && bankSelected?.id === item.id) {
      dispatch(selectedBank(null));
    } else {
      dispatch(selectedBank(item));
    }
  };

  useEffect(() => {
    getVNPayList()
      .then((response) => {
        setBanks(response.data);
      })
      .catch(() => {
        toast.error(MESSAGES.OCURRED_ERROR);
      });
  }, []);

  if (!banks) return <Spinner />;
  return (
    <aside className="grid grid-cols-4 gap-1">
      {banks?.map((bank, index) => (
        <div
          key={bank.code + index}
          onClick={() => handleSelectBank({ ...bank, id: index })}
          className="w-full bank relative h-full cursor-pointer"
        >
          <Image
            className={cn(
              itemClass,
              bankSelected && bankSelected?.id === index
                ? " before:border-primary before:border-2 shadow-[0_0.25rem_0.625rem_rgba(0,0,0,0.25)]"
                : " before:border-[#cccccc]"
            )}
            src={bank.logo}
            alt={bank.name}
          />
        </div>
      ))}
    </aside>
  );
};

export default React.memo(VNPayBanks);
