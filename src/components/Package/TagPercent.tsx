import React from "react";

const TagDiscountPercent = ({ percent }: { percent: number }) => (
  <span className="w-max flex text-center text-white relative">
    <svg
      width={42}
      height={19}
      viewBox="0 0 42 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.6748 1.84584C34.1064 1.22332 33.3023 0.868652 32.4594 0.868652H3C1.34315 0.868652 0 2.2118 0 3.86865V15.8687C0 17.5255 1.34315 18.8687 3 18.8687H32.4594C33.3023 18.8687 34.1064 18.514 34.6748 17.8915L41.3844 10.5429C41.733 10.161 41.733 9.57628 41.3844 9.19438L34.6748 1.84584Z"
        fill="url(#paint0_linear_2057_4301)"
      />

      <defs>
        <linearGradient
          id="paint0_linear_2057_4301"
          x1={42}
          y1="9.86877"
          x2="3.19134e-10"
          y2="9.86865"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6830B4" />
          <stop offset={1} stopColor="#C93186" />
        </linearGradient>
      </defs>
    </svg>
    {percent && (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-montserratBold text-xs">
        {-(percent || 0) + "%"}
      </span>
    )}
  </span>
);

export default TagDiscountPercent;
