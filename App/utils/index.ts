/* eslint-disable no-alert */
export const checkEmailIsValid = (checkEmail: string): boolean => {
  const regex = RegExp('^(([\\w+.]+)@[\\w]+.\\w[\\w]+(?:.\\w\\w)?)$', 'gm');
  return regex.test(checkEmail);
};

export const handleError = (
  error: {
    response?: {
      data: { error?: { message: string }; errors?: [{ message: string }] };
    };
  },
  defaultMessage: string
): void => {
  if (error.response) {
    if (error.response.data.error) alert(error.response.data.error.message);
    else if (error.response.data.errors)
      error.response.data.errors.forEach(({ message }: { message: string }) =>
        alert(`${message}`)
      );
    else alert(defaultMessage);
  } else alert(defaultMessage);
};
