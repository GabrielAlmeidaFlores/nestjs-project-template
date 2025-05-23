export abstract class BaseValueObject<T> {
  public constructor(protected readonly value: string) {}

  public abstract equals(other: T): boolean;
  public abstract toString(): string;
}
