import Image from "../../components/ui/Image";
import { useAppSelector } from "../../state/hooks";
import { IMAGES } from "../../utils/constants";
import React, { memo } from "react";

const Banner = () => {
  const { data } = useAppSelector((state) => state.campaign);
  const { kv } = data || {};
  return <Image src={kv || IMAGES.BANNER} alt="banner" className="w-full" />;
};

export default memo(Banner);
