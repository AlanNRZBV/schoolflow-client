export const getErrorMessage = (errors: unknown[]): string => {
  return errors
    .map((e) => {
      if (typeof e === 'string') {
        return e;
      }
      if (e && typeof e === 'object' && 'message' in e) {
        return String(e.message);
      }
      return '';
    })
    .filter(Boolean)
    .join(', ');
};
