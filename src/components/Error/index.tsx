import React from "react";
import Image from "../ui/Image";
import { MESSAGES, TEXT, VieON_URL } from "../../utils/constants";
import { Button } from "../ui/Button";

const Error = ({
  src,
  alt,
  message,
}: {
  src: string;
  alt: string;
  message: string;
}) => {
  const handleClick = () => (window.location.href = VieON_URL);
  return (
    <div className="max-w-lg mx-auto space-y-8 text-center text-black px-3">
      <Image src={src} alt={alt} />
      <div className="font-montserratMedium">
        <p className="text-base">{MESSAGES.SORRY}</p>
        <p
          className="text-base block md:inline"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
      <Button variant="primary" onClick={handleClick}>
        {TEXT.BACK_TO_HOME}
      </Button>
    </div>
  );
};

export default React.memo(Error);
