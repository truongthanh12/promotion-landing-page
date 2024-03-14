import FormPreview from "../../components/FormPreview";
import AsiaPayCheckout from "../../hooks/AsiaPayFunction";
import { checkStatusExpriedCampaign } from "../../models/Transaction";
import { PackageList, PurePackageList } from "../../models/package";
import { createVNPayTransactionByGateway } from "../../state/features/vnpaySlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/store";
import ConfigLocalStorage from "../../utils/config/ConfigLocalStorage";
import LocalStorage from "../../utils/config/LocalStorage";
import { PAYMENT_METHOD, TEXT } from "../../utils/constants";
import { formattedDate, parseJwt } from "../../utils/helper";
import { memo, useEffect, useMemo, useState } from "react";
import React from "react";

const InfoPreview = () => {
  const [info, setInfo] = useState<Partial<PurePackageList>>({
    name: "",
  });
  const [userId, setUserId] = useState("");

  const dispatch = useAppDispatch();

  const { packageSelected, methodSelected, phoneNumber } = useAppSelector(
    (state: RootState) => state.payment || {}
  );
  const { bankSelected } = useAppSelector((state) => state.vnpay);

  const { purePackageList } = useAppSelector(
    (state: RootState) => state.packages
  );
  const compaignData = useAppSelector(
    (state) => state.campaign?.data
  );
  const { promotion_code: promotionCode } = compaignData || {};
  const { infoData } = useAppSelector((state: RootState) => state.asiapay);
  const { cardNumber, cardName, cardValidDate, cardCVVCVC } = infoData || {};

  const { handleSubmitForm } = AsiaPayCheckout({ userId });

  const isDisabledButton = useMemo(() => {
    if (methodSelected?.id === PAYMENT_METHOD.ASIAPAY) {
      return !cardNumber || !cardName || !cardValidDate || !cardCVVCVC;
    } else if (methodSelected?.id === PAYMENT_METHOD.VN_PAY) {
      return !bankSelected?.id;
    }
    return true;
  }, [
    cardCVVCVC,
    cardName,
    cardNumber,
    cardValidDate,
    methodSelected,
    bankSelected,
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (methodSelected?.id === PAYMENT_METHOD.ASIAPAY) {
      await handleSubmitForm(infoData);
    } else if (methodSelected?.id === PAYMENT_METHOD.VN_PAY) {
      if (await checkStatusExpriedCampaign(dispatch)) return;
      dispatch(
        createVNPayTransactionByGateway({
          packageId: packageSelected.id,
          promotionCode,
          bankCode: bankSelected?.code,
        })
      );
    }
  };

  useEffect(() => {
    const tokenResponse = ConfigLocalStorage.get(LocalStorage.token);
    const token: string =
      typeof tokenResponse === "string" || tokenResponse === undefined
        ? tokenResponse
        : "";
    const decoded = parseJwt(token);
    if (decoded) {
      setUserId(decoded.id || decoded.sub);
    }
  }, []);

  useEffect(() => {
    if (purePackageList?.length > 0) {
      const packageFiltered = purePackageList?.find((item: PackageList) =>
        item.items.some((item) => item.id === packageSelected?.id)
      );
      setInfo(packageFiltered);
    }
  }, [purePackageList?.length, packageSelected?.id]);

  if (!packageSelected) return null;
  return (
    <div className="md:p-6 p-4 bg-[#F5F5F5] rounded-xl text-black relative mt-4 md:mt-1 xl:h-auto h-full">
      <h1 className="font-montserratBold md:text-2xl">{TEXT.DETAIL_INFO}</h1>
      <FormPreview
        accountName={phoneNumber || "-"}
        packageName={info?.name ? info?.name : "-"}
        packageTerm={packageSelected?.name}
        validDate={formattedDate(packageSelected?.start_date)}
        expireDate={formattedDate(packageSelected?.expired_date)}
        nextPaymentTerm={formattedDate(packageSelected?.expired_date)}
        price={packageSelected?.price}
        recurring={packageSelected?.recurring}
        onClick={(e: any) => handleSubmit(e)}
        disabled={isDisabledButton}
      />
    </div>
  );
};

export default memo(InfoPreview);
