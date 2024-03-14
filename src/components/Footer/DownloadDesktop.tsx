import React, { memo } from "react";
import { isMobile } from "react-device-detect";
import Image from "../ui/Image";
import { IMAGES, TEXT } from "../../utils/constants";

const DownloadDesktop = ({
  className,
  thumbClassName,
  contentClassName,
  contentLabelClassName,
  btnGroup,
  btnClassName,
}: any) => {
  return (
    <div className={className}>
      {!isMobile && (
        <div className={thumbClassName}>
          <Image src={IMAGES.DOWNLOAD_QR} alt="QR-Download-App-In-Footer" />
        </div>
      )}
      <div className={contentClassName}>
        <div className={contentLabelClassName}>
          {isMobile ? TEXT.QR_DOWNLOAD_APP_MOBILE : TEXT.QR_DOWNLOAD_APP}
        </div>

        <div className={btnGroup}>
          <a
            className={btnClassName}
            href={`https://itunes.apple.com/us/app/${process.env.REACT_APP_APPLE_STORE_ID}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={IMAGES.DOWNLOAD_APPSTORE}
              alt={TEXT.DOWNLOAD_APP_STORE}
            />
          </a>
          <a
            className={btnClassName}
            target="_blank"
            rel="noreferrer"
            href={`https://play.google.com/store/apps/details?id=${process.env.REACT_APP_GOOGLE_STORE_ID}`}
          >
            <Image
              src={IMAGES.DOWNLOAD_GG_PLAY}
              alt={TEXT.DOWNLOAD_APP_ANDROID}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(DownloadDesktop);
