import { cn } from "../../../utils/helper";
import React from "react";
import styles from "./Style.module.scss";

interface FloatingLabelInputProps {
  label: string;
  type: "text" | "number" | "password";
  labelClass: string;
  className: string;
  id: string;
  value: string;
  name: string;
  message: string;
  maxLength: number;
  minLength: number;
  autoFocus: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  Partial<FloatingLabelInputProps>
>(
  (
    { label, type = "text", labelClass, className, id, message, ...rest },
    ref
  ) => {
    return (
      <div className={styles.floatingInput}>
        <input
          id={id}
          type={type}
          ref={ref}
          placeholder=""
          className={cn(styles.input, "peer", className)}
          {...rest}
        />
        <label
          htmlFor={id}
          className={cn(
            styles.label,
            labelClass,
            "peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
          )}
        >
          {label}
        </label>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    );
  }
);

export default FloatingLabelInput;
