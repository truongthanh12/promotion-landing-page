import React from "react";
import { Button } from "../Button";
import Image from "../Image";
import styles from "./Style.module.scss";
import Popup from "./Popup";
import { cn } from "../../../utils/helper";
import { IMAGES, TEXT } from "../../../utils/constants";
import { useAppDispatch } from "../../../state/hooks";
import { changePhoneNumber } from "../../../state/features/paymentSlice";

type PopupProps = {
  closePopup: () => void;
};
const PhoneNumberUsed = React.forwardRef<HTMLDivElement, PopupProps>(
  ({ closePopup }, ref) => {
    const dispatch = useAppDispatch();
    const handleChangePhoneNumber = () => {
      dispatch(changePhoneNumber());
      closePopup();
    };

    return (
      <Popup
        ref={ref}
        className={cn("green-line w-full", styles.popupPhoneNumberUsed)}
      >
        <div className="mask-overlay-black relative w-full bg-[#111]">
          <div className="py-6 lg:py-12 w-[80%] mx-auto">
            <Image src={IMAGES.CAT_FAILED} alt="image" />
          </div>
        </div>
        <div className="p-4 lg:p-6 lg:px-8 w-full">
          <div className="space-y-4">
            <p className={styles.text}>
              {TEXT.ACCOUNT_ALREADY_RECEIVED}
              <br />
              {TEXT.PLEASE_CHANGE_PHONE_NUMBER}
            </p>
          </div>
          <div className="leading-tight mt-4 lg:mt-8">
            <Button onClick={handleChangePhoneNumber} className={styles.button}>
              {TEXT.CHANGE_PHONE_NUMBER}
            </Button>
          </div>
        </div>
      </Popup>
    );
  }
);

export default React.memo(PhoneNumberUsed);
