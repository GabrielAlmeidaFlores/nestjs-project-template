import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { CustomerSessionJwtInputModel } from '@lib/user-session/model/input/customer-session-jwt.input.model';
import { CustomerSessionJwtOutputModel } from '@lib/user-session/model/output/customer-session-jwt.output.model';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';

@Injectable()
export class LocalCacheStorageService implements UserSessionGateway {
  protected readonly _type = LocalCacheStorageService.name;

  public constructor(
    private readonly jwtService: JwtService,
    private readonly cacheStorageGateway: CacheStorageGateway,
  ) {}

  public async createCustomerSession(customerId: Guid): Promise<string> {
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

    const customerSessionJwt = CustomerSessionJwtInputModel.build({
      customerId: customerId.toString(),
      sessionId: sessionIdString,
    });

    return this.jwtService.sign({ ...customerSessionJwt });
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

  public verifyCustomerSession(
    token: string,
  ): CustomerSessionJwtOutputModel | null {
    try {
      return this.jwtService.verify<CustomerSessionJwtOutputModel>(token);
    } catch {
      return null;
    }
  }

  private generateCustomerSessionKey(customerId: Guid): string {
    const customerIdString = customerId.toString();
    return `customer-session:${customerIdString}`;
  }
}
