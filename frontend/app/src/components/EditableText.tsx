import { useMemo } from "react";
import { Flex } from "@/components/Flex";

type Props = {
  value: string | number;
  unit?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  as: "p" | "h1" | "h2" | "h3";
  type: "number" | "text";
  label: string;
};

export const EditableText = ({
  value,
  unit,
  onChange,
  onBlur,
  as,
  type,
  label
}: Props): React.ReactElement => {
  const textProps = useMemo(() => {
    return {
      style: {
        color: "transparent",
        fontSize: "1.25rem",
        fontWeight: "normal",
        lineHeight: 1
      }
    };
  }, []);

  const Text = useMemo(() => {
    switch (as) {
      case "p":
        return <p {...textProps}>{value}</p>;
      case "h1":
        return <h1 {...textProps}>{value}</h1>;
      case "h2":
        return <h2 {...textProps}>{value}</h2>;
      case "h3":
        return <h3 {...textProps}>{value}</h3>;
    }
  }, [as, value, textProps]);

  return (
    <Flex style={{ position: "relative", height: "100%" }} align="center">
      <input
        aria-label={label}
        defaultValue={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        style={{
          position: "absolute",
          left: 0,
          textAlign: "left",
          border: "none",
          borderRadius: 0,
          backgroundColor: "transparent",
          minWidth: "100%",
          maxWidth: "100%",
          fontSize: "1.25rem",
          lineHeight: 1
        }}
      />
      {Text}
    </Flex>
  );
};
