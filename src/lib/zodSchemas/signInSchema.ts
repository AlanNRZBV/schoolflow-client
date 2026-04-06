import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (!issue.input) return 'Почта обязательна';
      return 'Некорректный email';
    },
  }),
  password: z.string().min(4, { message: 'Минимум 4 символа' }),
});

export const signInSchemaDefaultValues = { email: '', password: '' };
