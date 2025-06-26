import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export abstract class CacheStorageGateway {
  public abstract createCustomerSession(customerId: Guid): Promise<Guid>;
  public abstract getCustomerSession(customerId: Guid): Promise<Guid | null>;
}
