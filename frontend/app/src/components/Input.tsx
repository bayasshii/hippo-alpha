import { ChangeEvent } from "react";

type Props = {
  name: string;
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ name, type, value, onChange, ...props }: Props) => {
  return (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      style={{
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        color: "#56555A"
      }}
      {...props}
    />
  );
};
