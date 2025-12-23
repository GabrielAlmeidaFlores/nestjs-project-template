import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import type { FastifyReply } from 'fastify';

export abstract class SetAuthTokenCookieUseCaseGateway {
  public abstract execute(
    reply: FastifyReply,
    authIdentityId: AuthIdentityId,
    userLevel: UserLevelEnum,
  ): Promise<void>;
}
