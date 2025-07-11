import { Injectable } from '@nestjs/common';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';

@Injectable()
export class LocalCacheStorageService implements UserSessionGateway {
  protected readonly _type = LocalCacheStorageService.name;

  public constructor(
    private readonly cacheStorageGateway: CacheStorageGateway,
  ) {}

  public async createCustomerSession(customerId: Guid): Promise<Guid> {
    const sessionId = Guid.generate();
    const sessionIdString = sessionId.toString();

    const secondsPerHour = 3600;
    const hoursPerDay = 24;
    const SecondsPerDay = secondsPerHour * hoursPerDay;
    const sessionTtlInSeconds = SecondsPerDay;

    const key = this.generateCustomerSessionKey(customerId);

    await this.cacheStorageGateway.setData(
      key,
      sessionIdString,
      sessionTtlInSeconds,
    );

    return sessionId;
  }

  public async getCustomerSession(customerId: Guid): Promise<Guid | null> {
    const key = this.generateCustomerSessionKey(customerId);
    const customerSession = await this.cacheStorageGateway.getData(key);

    const customerSessionExists = customerSession !== null;

    if (customerSessionExists) {
      return new Guid(customerSession);
    }

    return null;
  }

  private generateCustomerSessionKey(customerId: Guid): string {
    const customerIdString = customerId.toString();
    return `customer-session:${customerIdString}`;
  }
}
