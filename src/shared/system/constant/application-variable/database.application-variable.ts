import { EnvironmentVariable } from '@shared/system/constant/application-variable/utils/environment-variable.object';

export class DatabaseApplicationVariable {
  public static readonly defaultDatabaseSynchronize = false;

  public static readonly source = new EnvironmentVariable();

  public static readonly DATABASE_HOST =
    DatabaseApplicationVariable.source.getOrThrow<string>(
      'DATABASE_HOST',
      String,
    );

  public static readonly DATABASE_PORT =
    DatabaseApplicationVariable.source.getOrThrow<number>(
      'DATABASE_PORT',
      Number,
    );

  public static readonly DATABASE_NAME =
    DatabaseApplicationVariable.source.getOrThrow<string>(
      'DATABASE_NAME',
      String,
    );

  public static readonly DATABASE_USERNAME =
    DatabaseApplicationVariable.source.getOrThrow<string>(
      'DATABASE_USERNAME',
      String,
    );

  public static readonly DATABASE_PASSWORD =
    DatabaseApplicationVariable.source.getOrThrow<string>(
      'DATABASE_PASSWORD',
      String,
    );

  public static readonly DATABASE_SYNCHRONIZE =
    DatabaseApplicationVariable.source.getOrDefault<boolean>(
      'DATABASE_SYNCHRONIZE',
      Boolean,
      DatabaseApplicationVariable.defaultDatabaseSynchronize,
    );

  public static readonly DATABASE_HASH_SALT_ROUNDS =
    DatabaseApplicationVariable.source.getOrThrow<number>(
      'DATABASE_HASH_SALT_ROUNDS',
      Number,
    );

  public static readonly DATABASE_CRYPTOGRAPHY_SECRET =
    DatabaseApplicationVariable.source.getOrThrow<string>(
      'DATABASE_CRYPTOGRAPHY_SECRET',
      String,
    );

  public static readonly DATABASE_CRYPTOGRAPHY_IV =
    DatabaseApplicationVariable.source.getOrThrow<string>(
      'DATABASE_CRYPTOGRAPHY_IV',
      String,
    );

  public static readonly DATABASE_CRYPTOGRAPHY_METHOD =
    DatabaseApplicationVariable.source.getOrThrow<string>(
      'DATABASE_CRYPTOGRAPHY_METHOD',
      String,
    );

  protected readonly _type = DatabaseApplicationVariable.name;
}
