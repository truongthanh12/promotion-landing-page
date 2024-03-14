import React, { useMemo, useState } from "react";
import { cn } from "../../../utils/helper";
import { IMAGES } from "../../../utils/constants";

interface ImageProps {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  onClick?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  placeholderSrc,
  className,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoaded = () => setLoading(false);
  const handleImageError = () => setHasError(true);
  const newSrc = useMemo(
    () => (!hasError ? src : IMAGES.DEFAULT_BANNER_16x9),
    [src, hasError]
  );

  return (
    <div className={cn(className, "w-full h-auto relative")}>
      {isLoading && (
        <div className="animate-pulse rounded bg-gray-200 w-full h-full absolute"></div>
      )}
      <img
        width="600"
        height="400"
        className={cn("w-full h-auto", { hidden: isLoading })}
        src={newSrc}
        alt={alt}
        onLoad={handleImageLoaded}
        onError={handleImageError}
        {...rest}
      />
    </div>
  );
};

export default Image;
