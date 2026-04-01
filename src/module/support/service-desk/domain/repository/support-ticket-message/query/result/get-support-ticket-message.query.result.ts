import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export class GetSupportTicketMessageQueryResult extends BaseBuildableObject {
  public readonly senderAuthIdentityId: AuthIdentityId;
  public readonly senderName: string;
  public readonly content: string;
  public readonly createdAt: Date;

  protected override readonly _type = GetSupportTicketMessageQueryResult.name;
}
