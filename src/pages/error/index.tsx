import React, { useMemo } from "react";
import { ERROR_TYPE, IMAGES, MESSAGES } from "../../utils/constants";
import Error from "../../components/Error";

const ErrorContainer = ({ errorType }: { errorType: any }) => {
  const src = useMemo(() => {
    switch (errorType) {
      case ERROR_TYPE.TIMEOUT:
        return IMAGES.TIMEOUT_ERROR;
      case ERROR_TYPE.ENDED:
        return IMAGES.ENDED;
      default:
        return IMAGES.TIMEOUT_ERROR;
    }
  }, [errorType]);

  const alt = useMemo(() => {
    switch (errorType) {
      case ERROR_TYPE.TIMEOUT:
        return "image timeout error";
      case ERROR_TYPE.ENDED:
        return "image ended error";
      default:
        return "Image page not found";
    }
  }, [errorType]);

  const message = useMemo(() => {
    switch (errorType) {
      case ERROR_TYPE.TIMEOUT:
        return MESSAGES.OCURRED_ERROR;
      case ERROR_TYPE.ENDED:
        return MESSAGES.ENDED_CAMPAIGN;
      default:
        return MESSAGES.PAGE_NOT_FOUND;
    }
  }, [errorType]);

  return <Error src={src} alt={alt} message={message} />;
};

export default React.memo(ErrorContainer);
