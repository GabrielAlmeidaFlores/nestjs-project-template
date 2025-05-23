type SelectPublicPropertyType<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : K;
}[keyof T];

export type PublicPropertyType<T> = Pick<T, SelectPublicPropertyType<T>>;
