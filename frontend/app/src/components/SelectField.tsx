import { ChangeEvent } from "react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Flex } from "@/components/Flex";
import { Select } from "@/components/Select";

type Props = {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  errorMessages?: Array<string>;
  options?: Array<{ value: string | number; label: string }>;
};

export const SelectField = ({
  label,
  name,
  options = [],
  value,
  onChange,
  errorMessages,
  ...props
}: Props) => {
  return (
    <Flex direction="column" gap={0.25}>
      <label htmlFor={name} style={{ fontSize: "0.75rem", color: "#56555A" }}>
        {label}
      </label>
      <Select
        value={value}
        name={name}
        options={options}
        onChange={onChange}
        {...props}
      />
      <ErrorMessage messages={errorMessages} />
    </Flex>
  );
};
