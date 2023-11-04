export const useValidation = () => {
  const validations = (value: string | number, maxLength: number) => {
    const errors: Array<string> = [];
    if (String(value).length > maxLength)
      errors.push(`${maxLength}文字以内で入力してください`);
    if (value === "") errors.push("入力してください");
    return errors;
  };
  return { validations };
};
