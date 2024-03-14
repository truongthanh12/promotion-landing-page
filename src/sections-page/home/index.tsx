import React, { memo, useEffect } from "react";
import Banner from "./Banner";
import PromotionInfo from "./PromotionInfo";
import PaymentSteps from "./PaymentSteps";
import InfoPreview from "./InfoPreview";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getPackagesCampaign } from "../../state/features/packageSlice";
import { RootState } from "../../state/store";
import { changePhoneNumber } from "../../state/features/paymentSlice";
import Spinner from "../../components/Spinner";
import { isMobile } from "react-device-detect";

const Home = () => {
  const { data } = useAppSelector((state: RootState) => state.campaign);
  const { isLoadingData } = useAppSelector((state) => state.app);

  const { packages } = data || {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(changePhoneNumber());
    };
  }, [dispatch]);

  useEffect(() => {
    if (packages?.length > 0) {
      dispatch(getPackagesCampaign({ packageList: packages }));
    }
  }, [dispatch, packages]);

  return (
    <div
      className="lg:grid lg:grid-cols-2 gap-4"
      style={{ gridTemplateColumns: isMobile ? "50% 50% " : "57% 43%" }}
    >
      <Banner />
      <PromotionInfo />
      <PaymentSteps />
      <InfoPreview />
      {isLoadingData && (
        <div className="z-[9999] bg-black/[0.5] fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default memo(Home);
