type Props = {
  message: string;
};

export const Toast = ({ message }: Props) => {
  return (
    <div style={{ position: "fixed", background: "#ccc", top: 0 }}>
      {message}
    </div>
  );
};
