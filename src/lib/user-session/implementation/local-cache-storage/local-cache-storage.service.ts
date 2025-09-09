import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { UserSessionJwtInputModel } from '@lib/user-session/model/input/user-session-jwt.input.model';
import { UserSessionJwtOutputModel } from '@lib/user-session/model/output/user-session-jwt.output.model';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class LocalCacheStorageService implements UserSessionGateway {
  protected readonly _type = LocalCacheStorageService.name;

  public constructor(
    private readonly jwtService: JwtService,
    private readonly cacheStorageGateway: CacheStorageGateway,
  ) {}

  public async createCustomerSession(customerId: Guid): Promise<string> {
    const sessionId = new Guid();
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

  public async getCustomerSession(customerId: Guid): Promise<Guid | null> {
    const key = this.generateCustomerSessionKey(customerId);
    const customerSession = await this.cacheStorageGateway.getData(key);

    const customerSessionExists = customerSession !== null;

    if (customerSessionExists) {
      return new Guid(customerSession);
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

  private generateCustomerSessionKey(customerId: Guid): string {
    return this.generateUserSessionKey(customerId, UserLevelEnum.CUSTOMER);
  }

  private generateUserSessionKey(
    userId: Guid,
    userLevel: UserLevelEnum,
  ): string {
    const id = userId.toString();
    const level = userLevel;

    return `user:session:${level}:${id}`;
  }
}
