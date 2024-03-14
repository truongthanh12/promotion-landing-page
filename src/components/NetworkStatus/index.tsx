import { setTypeError } from "../../state/features/paymentSlice";
import { ERROR_TYPE } from "../../utils/constants";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const NetworkStatus = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnline = () => {
      dispatch(setTypeError(null));
    };

    const handleOffline = () => {
      dispatch(setTypeError(ERROR_TYPE.NETWORK_ERROR));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  return children;
};

export default React.memo(NetworkStatus);
