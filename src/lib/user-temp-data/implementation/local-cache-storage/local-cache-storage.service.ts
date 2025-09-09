import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { UserSessionJwtInputModel } from '@lib/user-temp-data/model/input/user-session-jwt.input.model';
import { UserSessionJwtOutputModel } from '@lib/user-temp-data/model/output/user-session-jwt.output.model';
import { UserTempDataGateway } from '@lib/user-temp-data/user-temp-data.gateway';
import { CustomerId } from '@module/customer/auth/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class LocalCacheStorageService implements UserTempDataGateway {
  protected readonly _type = LocalCacheStorageService.name;

  public constructor(
    private readonly jwtService: JwtService,
    private readonly cacheStorageGateway: CacheStorageGateway,
  ) {}

  public async createCustomerSession(customerId: CustomerId): Promise<string> {
    const sessionId = new CustomerId();
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

    const customerSessionJwt = UserSessionJwtInputModel.build({
      customerId: customerId.toString(),
      sessionId: sessionIdString,
      userLevel: UserLevelEnum.CUSTOMER,
    });

    return this.jwtService.sign({ ...customerSessionJwt });
  }

  public async getCustomerSession(
    customerId: CustomerId,
  ): Promise<CustomerId | null> {
    const key = this.generateCustomerSessionKey(customerId);
    const customerSession = await this.cacheStorageGateway.getData(key);

    const customerSessionExists = customerSession !== null;

    if (customerSessionExists) {
      return new CustomerId(customerSession);
    }

    return null;
  }

  public verifySession(token: string): UserSessionJwtOutputModel | null {
    try {
      return this.jwtService.verify<UserSessionJwtOutputModel>(token);
    } catch {
      return null;
    }
  }

  private generateCustomerSessionKey(customerId: CustomerId): string {
    return this.generateUserSessionKey(customerId, UserLevelEnum.CUSTOMER);
  }

  private generateUserSessionKey<Id extends Guid>(
    userId: Id,
    userLevel: UserLevelEnum,
  ): string {
    const id = userId.toString();
    const level = userLevel;

    return `user:session:${level}:${id}`;
  }
}
