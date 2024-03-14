import React from "react";
import { Button } from "../ui/Button";
import { STEP, TEXT } from "../../utils/constants";
import { cn } from "../../utils/helper";
import { useAppDispatch } from "../../state/hooks";
import { setStep } from "../../state/features/paymentSlice";

type NotifyProps = {
  message: TrustedHTML | string;
  buttonText?: string;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
  buttonContainerClass?: string;
};
const Notify: React.FC<NotifyProps> = ({
  message,
  buttonText,
  onClick,
  className,
  isLoading,
  buttonContainerClass,
}) => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(setStep(STEP.METHOD));
  };

  return (
    <div className={cn("text-center h-full px-2 mx-auto", className)}>
      <div
        className="flex space-x-2 justify-center items-center pb-2 md:pb-3"
        dangerouslySetInnerHTML={{ __html: message }}
      />
      <div
        className={cn(
          "flex w-full justify-center items-center space-x-2",
          buttonContainerClass || "lg:max-w-[80%] xl:max-w-[70%]"
        )}
      >
        <Button
          variant="outline"
          className="w-1/2 rounded-xl text-primary border-primary text-base transition hover:opacity-80"
          onClick={handleBack}
        >
          {TEXT.BACK}
        </Button>
        <Button
          className="text-white w-1/2 rounded-xl flex justify-center mx-auto items-center bg-primary hover:opacity-75 transition text-base"
          onClick={onClick}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {buttonText || TEXT.RETRY}
        </Button>
      </div>
    </div>
  );
};

export default Notify;
