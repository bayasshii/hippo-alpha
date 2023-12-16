import { ChangeEvent, ReactNode } from "react";

export type SelectProps = {
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  options?: Array<{ value: string | number; label: string }>;
  suffix?: ReactNode;
};

export const Select = ({
  name,
  value,
  options = [],
  onChange,
  suffix,
  ...props
}: SelectProps) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      position: "relative"
    }}
  >
    <select
      id={name}
      name={name}
      onChange={onChange}
      value={value}
      style={{
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        color: "#56555A",
        textAlign: "right",
        ...(suffix && { paddingRight: "1.5rem" }),
        minWidth: "8rem"
      }}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

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
