import React, { useEffect, useRef } from "react";
import { POPUP_NAME } from "../../../utils/constants";
import { RootState } from "../../../state/store";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import PhoneNumberUsed from "./PhoneNumberUsed";
import { clearPopup } from "../../../state/features/popupSlice";
import { isMobile } from "react-device-detect";

const Popup = () => {
  const popupName = useAppSelector((state: RootState) => state.popup.popup);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (popupName) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [popupName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(clearPopup());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const closePopup = () => {
    dispatch(clearPopup());
  };

  const handleClosePopupUsed = () => {
    closePopup();
    if (isMobile) {
      window.location.reload();
    }
  };

  if (!popupName) return null;
  switch (popupName) {
    case POPUP_NAME.PHONE_NUMBER_USED:
      return (
        <PhoneNumberUsed ref={modalRef} closePopup={handleClosePopupUsed} />
      );
    default:
      return null;
  }
};

export default React.memo(Popup);
