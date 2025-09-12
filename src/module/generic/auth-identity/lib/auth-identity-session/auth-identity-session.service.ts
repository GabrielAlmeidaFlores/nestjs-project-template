import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentitySessionJwtInputModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/input/auth-identity-session-jwt.input.model';
import { AuthIdentitySessionJwtWithParsedContentOutputModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/output/auth-identity-session-jwt-with-parsed-content.output.model';
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
    const SecondsPerDay = secondsPerHour * hoursPerDay;
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
    } as AuthIdentitySessionJwtInputModel;

    return this.jwtService.sign(jwtContent);
  }

  public async getSession(
    jwt: string,
  ): Promise<AuthIdentitySessionJwtWithParsedContentOutputModel | null> {
    const jwtContent = this.extractDataFromJWT(jwt);

    if (jwtContent === null) {
      return null;
    }

    const jwtWithParsedContent =
      AuthIdentitySessionJwtWithParsedContentOutputModel.build({
        authIdentity: new AuthIdentityId(jwtContent.authIdentityId),
        sessionId: new Guid(jwtContent.sessionId),
        userLevel: jwtContent.userLevel,
      });

    const key = this.generateAuthIdentitySessionKey(
      jwtWithParsedContent.authIdentity,
    );
    const session = await this.cacheStorageGateway.getData(key);

    if (session === null || session !== jwtContent.sessionId) {
      return null;
    }

    return jwtWithParsedContent;
  }

  private extractDataFromJWT(
    token: string,
  ): AuthIdentitySessionJwtOutputModel | null {
    try {
      return this.jwtService.verify<AuthIdentitySessionJwtOutputModel>(token);
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
