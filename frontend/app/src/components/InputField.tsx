import { ChangeEvent } from "react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Input } from "@/components/Input";
import { Flex } from "@/components/Flex";

type Props = {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessages?: Array<string>;
};

export const InputField = ({
  label,
  name,
  type,
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
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <ErrorMessage messages={errorMessages} />
    </Flex>
  );
};
