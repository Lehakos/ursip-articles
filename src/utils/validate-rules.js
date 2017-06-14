export const required = value => value ? undefined : 'Необходимо заполнить';

export const minLength = min => value => value && value.length < min ? `Не меньше ${min} знаков` : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Не больше ${max} знаков` : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? 'Введите число' : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Введите корректный адрес электронной почты'
    : undefined;
