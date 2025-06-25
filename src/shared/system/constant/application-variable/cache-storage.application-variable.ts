import { EnvironmentVariable } from '@shared/system/constant/application-variable/utils/environment-variable.object';

export class CacheStorageApplicationVariable {
  public static readonly source = new EnvironmentVariable();

  public static readonly CACHE_STORAGE_HOST =
    CacheStorageApplicationVariable.source.getValueOrThrow<string>(
      'CACHE_STORAGE_HOST',
      String,
    );

  public static readonly CACHE_STORAGE_PORT =
    CacheStorageApplicationVariable.source.getValueOrThrow<number>(
      'CACHE_STORAGE_PORT',
      Number,
    );

  public static readonly CACHE_STORAGE_PASSWORD =
    CacheStorageApplicationVariable.source.getValueOrThrow<string>(
      'CACHE_STORAGE_PASSWORD',
      String,
    );

  public static readonly CACHE_STORAGE_CRYPTOGRAPHY_SECRET =
    CacheStorageApplicationVariable.source.getValueOrThrow<string>(
      'CACHE_STORAGE_CRYPTOGRAPHY_SECRET',
      String,
    );

  public static readonly CACHE_STORAGE_CRYPTOGRAPHY_IV =
    CacheStorageApplicationVariable.source.getValueOrThrow<string>(
      'CACHE_STORAGE_CRYPTOGRAPHY_IV',
      String,
    );

  public static readonly CACHE_STORAGE_CRYPTOGRAPHY_METHOD =
    CacheStorageApplicationVariable.source.getValueOrThrow<string>(
      'CACHE_STORAGE_CRYPTOGRAPHY_METHOD',
      String,
    );

  protected readonly _type = CacheStorageApplicationVariable.name;
}
