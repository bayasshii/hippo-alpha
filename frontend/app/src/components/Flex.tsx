type Props = {
  children: React.ReactNode;
  direction?: "row" | "column";
  justify?: "flex-start" | "flex-end" | "center" | "space-between";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: number;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  style?: Record<string, string | number>;
};

export const Flex = ({
  children,
  direction,
  justify,
  align,
  gap,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  style = {},
  ...props
}: Props) => (
  <div
    style={{
      display: "flex",
      ...(direction && { flexDirection: direction }),
      ...(justify && { justifyContent: justify }),
      ...(align && { alignItems: align }),
      ...(gap && { gap: `${gap}rem` }),
      ...((p || px || py || pt || pr || pb || pl) && {
        padding: `${pt || py || p || 0}rem ${pr || px || p || 0}rem ${
          pb || py || p || 0
        }rem ${pl || px || p || 0}rem`
      }),
      ...((m || mx || my || mt || mr || mb || ml) && {
        margin: `${mt || my || m || 0}rem ${mr || mx || m || 0}rem ${
          mb || my || m || 0
        }rem ${ml || mx || m || 0}rem`
      }),
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);
