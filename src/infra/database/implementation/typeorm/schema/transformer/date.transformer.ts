export const DateTransformer = {
  to(value?: Date | null): string | null {
    if (value === null || value === undefined) {
      return null;
    }
    return value.toISOString();
  },
  from(value?: string | null): Date | null {
    if (value === null || value === undefined) {
      return null;
    }
    return new Date(value);
  },
};
