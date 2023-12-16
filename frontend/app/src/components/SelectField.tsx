import { ErrorMessage } from "@/components/ErrorMessage";
import { Flex } from "@/components/Flex";
import { Select, SelectProps } from "@/components/Select";

type Props = {
  label: string;
  errorMessages?: Array<string>;
} & SelectProps;

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
    <Flex direction="column" gap={0.25} align="flex-start">
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
