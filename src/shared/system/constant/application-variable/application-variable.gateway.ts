export abstract class ApplicationVariableGateway {
  public abstract getArrayOrThrow<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
  ): Array<T>;

  public abstract getValueOrThrow<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
  ): T;

  public abstract getValueOrDefault<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
    defaultValue: T,
  ): T;
}
