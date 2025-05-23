export function StaticImplements<T>(): <U extends T>(constructor: U) => void {
  return function <U extends T>(_constructor: U): void {
    ((): void => undefined)();
  };
}
