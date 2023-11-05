export const useNumberValidation = () => {
  type NumberValidations = {
    value: number;
    max?: number;
    min?: number;
    isInteger?: boolean;
  };
  const numberValidations = ({
    value,
    max,
    min,
    isInteger
  }: NumberValidations) => {
    const errors: Array<string> = [];
    if (max && value > max) errors.push(`${max}以内の値を入力してください`);
    if (min && value < min) errors.push(`${min}より大きな値を入力してください`);
    if (isInteger && !Number.isInteger(value))
      errors.push("整数値を入力してください");
    if (value === null) errors.push("入力してください");
    return errors;
  };
  return { numberValidations };
};
