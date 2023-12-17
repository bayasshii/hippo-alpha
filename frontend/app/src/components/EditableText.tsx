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
  onChange,
  onBlur,
  as,
  type,
  label
}: Props): React.ReactElement => {
  return (
    <Flex style={{ position: "relative", height: "100%" }} align="center">
      <input
        aria-label={label}
        value={value}
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
      <h1
        style={{
          color: "transparent",
          fontSize: "1.25rem",
          fontWeight: "normal",
          lineHeight: 1
        }}
      >
        {value}
      </h1>
    </Flex>
  );
};
