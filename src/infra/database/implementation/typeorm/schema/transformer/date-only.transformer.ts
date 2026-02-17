export const DateOnlyTransformer = {
  to(value?: Date | null): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  from(value?: string | null): Date | null {
    if (value === null || value === undefined) {
      return null;
    }
    return new Date(value);
  },
};
