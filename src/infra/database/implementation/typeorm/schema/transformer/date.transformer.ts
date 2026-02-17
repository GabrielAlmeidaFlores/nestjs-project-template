export const DateTransformer = {
  to(value?: Date | null): string | null | undefined {
    if (value === null || value === undefined) {
      return value;
    }
    return value.toISOString();
  },
  from(value?: string | null): Date | null | undefined {
    if (value === null || value === undefined) {
      return value;
    }
    return new Date(value);
  },
};
