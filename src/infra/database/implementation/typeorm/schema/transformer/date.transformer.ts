export const DateTransformer = {
  to(value?: string | null): string | null | undefined {
    return value;
  },
  from(value?: string | null): Date | null | undefined {
    if (value === undefined || value === null) {
      return value;
    }
    return new Date(value);
  },
};
