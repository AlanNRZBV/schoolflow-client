import { AxiosError } from 'axios';

interface ParsedError {
  title: string;
  message: string;
}

export const parseApiError = (error: unknown): ParsedError => {
  const fallback = {
    title: 'Неизвестная ошибка',
    message: 'Что-то пошло не так. Попробуйте позже.',
  };

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    switch (status) {
      case 400:
        return {
          title: 'Ошибка заполнения',
          message: serverMessage || 'Проверьте введенные данные.',
        };
      case 401:
        return { title: 'Ошибка входа', message: 'Неверный email или пароль.' };
      case 403:
        return {
          title: 'Нет доступа',
          message: 'У вас нет прав для этого действия.',
        };
      case 404:
        return {
          title: 'Не найдено',
          message: 'Запрошенные данные не существуют.',
        };
      case 500:
        return {
          title: 'Сбой на сервере',
          message: 'Мы уже чиним. Попробуйте через пару минут.',
        };
      default:
        return {
          title: 'Сетевая ошибка',
          message: serverMessage || 'Проверьте подключение к интернету.',
        };
    }
  }

  return fallback;
};
