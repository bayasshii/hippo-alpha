type Props = {
  messages?: Array<string>;
};
export const ErrorMessage = ({ messages }: Props) => {
  if (!messages) return null;
  return (
    <>
      {messages.map((message, key) => (
        <div key={key} style={{ color: "red" }}>
          {message}
        </div>
      ))}
    </>
  );
};
