export const useFormValidator = () => {
  const emailValidate = (value: string): string | null => {
    return /^\S+@\S+$/.test(value) ? null : "Введите корректный email";
  };

  const passwordValidate = (value: string): string | null => {
    return value.length >= 6 ? null : "Минимальная длина пароля 6 символов";
  };

  return { emailValidate, passwordValidate };
};
