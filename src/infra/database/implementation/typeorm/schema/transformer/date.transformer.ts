export const DateTransformer = {
  to(value?: string): string | undefined {
    return value;
  },
  from(value?: string): Date | undefined {
    if (value === undefined) {
      return;
    }
    return new Date(value);
  },
};
