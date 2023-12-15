import { ChangeEvent } from "react";

type Props = {
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  options?: Array<{ value: string | number; label: string }>;
};

export const Select = ({
  name,
  value,
  options = [],
  onChange,
  ...props
}: Props) => (
  <select
    id={name}
    name={name}
    onChange={onChange}
    value={value}
    style={{
      border: "1px solid #ddd",
      borderRadius: "0.5rem",
      padding: "0.5rem",
      color: "#56555A"
    }}
    {...props}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
