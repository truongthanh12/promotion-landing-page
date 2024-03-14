import React from "react";
import { cn } from "../../../utils/helper";

type InputType = {
  label: string;
  name: string;
  id: string;
  type: string;
  placeholder: string;
  className: string;
  value: string;
  autoFocus: boolean;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = React.forwardRef<HTMLInputElement, Partial<InputType>>(
  ({ className, ...props }, ref) => {
    const classes = cn("shadow-sm", className);

    return <input {...props} className={cn(classes, className)} ref={ref} />;
  }
);
