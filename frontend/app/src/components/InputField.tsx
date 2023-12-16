import { ErrorMessage } from "@/components/ErrorMessage";
import { Input, InputProps } from "@/components/Input";
import { Flex } from "@/components/Flex";

type Props = {
  label: string;
  errorMessages?: Array<string>;
} & InputProps;

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
    <Flex direction="column" gap={0.25} align="flex-start">
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
