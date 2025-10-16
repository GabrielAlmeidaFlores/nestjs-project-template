class DateTransformerUtil {
  protected readonly _type = DateTransformerUtil.name;

  public static encrypt(value?: string): string | undefined {
    return value;
  }

  public static decrypt(value?: string): Date | undefined {
    if (value === undefined) {
      return;
    }
    return new Date(value);
  }
}

export const DateTransformer = {
  to(value?: string): string | undefined {
    return DateTransformerUtil.encrypt(value);
  },
  from(value?: string): Date | undefined {
    return DateTransformerUtil.decrypt(value);
  },
};
