export abstract class CacheStorageGateway {
  public abstract getData(key: string): Promise<string | null>;
  public abstract setData(
    key: string,
    value: string,
    ttl: number,
  ): Promise<void>;
  public abstract deleteData(key: string): Promise<void>;
}
