export const formValidator = () => {
  const isEmailValid = (value: string): boolean => {
    return /^\S+@\S+$/.test(value) && value.length > 5;
  };

  const isPasswordValid = (value: string): boolean => {
    return value.length >= 6;
  };

  const isLoginValid = (value: string): boolean => {
    return value.length >= 3;
  };

  const isEmpty = (value: string): boolean => {
    return value.trim().length === 0;
  };

  return { isEmailValid, isPasswordValid, isEmpty, isLoginValid };
};
