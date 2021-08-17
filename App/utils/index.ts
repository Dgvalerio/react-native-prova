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

export const formatMoney = (money: number): string => {
  const aux = `R$ ${money}`.split('.');
  if (aux.length > 1) return `${aux[0]},${`${aux[1]}`.slice(-2)}0`;
  return `R$ ${money},00`;
};

export const formatDate = (date: string | Date): string =>
  `${date}`
    .split('T')[0]
    .replace(
      /([\d]+)-([\d]+)-([\d]+)/gm,
      (m, p1, p2, p3) => `${p3}/${p2}/${p1}`
    );

export const wait = (timeout: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeout));
