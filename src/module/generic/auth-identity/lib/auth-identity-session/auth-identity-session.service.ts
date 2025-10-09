import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentitySessionJwtModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/generic/auth-identity-session-jwt.model';
import { AuthIdentitySessionJwtOutputModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/output/auth-identity-session-jwt.output.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class AuthIdentitySessionService implements AuthIdentitySessionGateway {
  protected readonly _type = AuthIdentitySessionService.name;

  public constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(CacheStorageGateway)
    private readonly cacheStorageGateway: CacheStorageGateway,
  ) {}

  public async createSession(
    authIdentityId: AuthIdentityId,
    userLevel: UserLevelEnum,
  ): Promise<string> {
    const sessionId = new Guid();
    const sessionKey = this.generateAuthIdentitySessionKey(authIdentityId);

    const secondsPerHour = 3600;
    const hoursPerDay = 24;
    const days = 7;
    const SecondsPerDay = secondsPerHour * hoursPerDay * days;
    const sessionTtlInSeconds = SecondsPerDay;

    await this.cacheStorageGateway.setData(
      sessionKey,
      sessionId.toString(),
      sessionTtlInSeconds,
    );

    const jwtContent = {
      userLevel,
      authIdentityId: authIdentityId.toString(),
      sessionId: sessionId.toString(),
    } as AuthIdentitySessionJwtModel;

    return this.jwtService.sign(jwtContent);
  }

  public async getSession(
    authIdentityId: AuthIdentityId,
  ): Promise<Guid | null> {
    const sessionKey = this.generateAuthIdentitySessionKey(authIdentityId);

    const sessionData = await this.cacheStorageGateway.getData(sessionKey);

    if (sessionData === null) {
      return sessionData;
    }

    return new Guid(sessionData);
  }

  public async deleteSession(authIdentityId: AuthIdentityId): Promise<void> {
    const sessionKey = this.generateAuthIdentitySessionKey(authIdentityId);

    await this.cacheStorageGateway.deleteData(sessionKey);
  }

  public async getSessionDataFromJwt(
    jwt: string,
  ): Promise<AuthIdentitySessionJwtOutputModel | null> {
    const jwtContent = this.extractDataFromJWT(jwt);

    if (jwtContent === null) {
      return null;
    }

    const jwtWithParsedContent = AuthIdentitySessionJwtOutputModel.build({
      authIdentityId: new AuthIdentityId(jwtContent.authIdentityId),
      sessionId: new Guid(jwtContent.sessionId),
      userLevel: jwtContent.userLevel,
    });

    const key = this.generateAuthIdentitySessionKey(
      jwtWithParsedContent.authIdentityId,
    );
    const session = await this.cacheStorageGateway.getData(key);

    if (session === null || session !== jwtContent.sessionId) {
      return null;
    }

    return jwtWithParsedContent;
  }

  private extractDataFromJWT(
    token: string,
  ): AuthIdentitySessionJwtModel | null {
    try {
      return this.jwtService.verify<AuthIdentitySessionJwtModel>(token);
    } catch {
      return null;
    }
  }

  private generateAuthIdentitySessionKey(
    authIdentityId: AuthIdentityId,
  ): string {
    return `auth-identity:session:${authIdentityId.toString()}`;
  }
}
