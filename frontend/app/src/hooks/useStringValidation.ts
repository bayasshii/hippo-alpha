export const useStringValidation = () => {
  type StringValidations = {
    value: string;
    maxLength?: number;
  };
  const stringValidations = ({ value, maxLength }: StringValidations) => {
    const errors: Array<string> = [];
    if (maxLength && value.length > maxLength)
      errors.push(`${maxLength}文字以内で入力してください`);
    if (value === "") errors.push("入力してください");
    return errors;
  };
  return { stringValidations };
};
