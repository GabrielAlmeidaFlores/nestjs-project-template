export const DateOnlyTransformer = {
  to(value?: Date | null): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    const year = value.getUTCFullYear();
    const month = String(value.getUTCMonth() + 1).padStart(2, '0');
    const day = String(value.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  from(value?: string | null): Date | null {
    if (value === null || value === undefined) {
      return null;
    }
    return new Date(`${value}T00:00:00.000Z`);
  },
};
