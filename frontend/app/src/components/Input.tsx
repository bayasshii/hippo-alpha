import { ChangeEvent, ReactNode } from "react";

export type InputProps = {
  name: string;
  type: string;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const Input = ({
  name,
  type,
  value,
  onChange,
  onBlur,
  prefix,
  suffix,
  ...props
}: InputProps) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative"
      }}
    >
      {prefix && (
        <span
          style={{
            position: "absolute",
            left: "0.5rem",
            color: "#8D8B95",
            fontSize: "0.75rem"
          }}
        >
          {prefix}
        </span>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          border: "1px solid #ddd",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          color: "#56555A",
          textAlign: "right",
          width: "8rem"
        }}
        {...props}
      />
      {suffix && (
        <span
          style={{
            position: "absolute",
            right: "0.5rem",
            color: "#8D8B95",
            fontSize: "0.75rem"
          }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
};