import React from "react";
import Image from "../ui/Image";
import { IMAGES } from "../../utils/constants";

const VieONIntro = () => {
  
  return (
    <div
      className="w-full h-full min-h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black z-[9999]"
    >
      <div className="w-1/2 md:w-1/4">
        <Image
          className="animate-zoom-in-3s w-full h-full"
          src={IMAGES.LOGO_INTRO}
          alt="logo VieON intro"
        />
      </div>
    </div>
  );
};

export default React.memo(VieONIntro);
