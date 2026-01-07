import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { MessageModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/message.model';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export class ConversationModel extends BaseBuildableObject {
  public id: Guid;
  public organizationId: OrganizationId;
  public authIdentityId: AuthIdentityId;
  public title: string;
  public messages: MessageModel[];
  public createdAt: Date;
  public updatedAt: Date;

  protected override readonly _type = ConversationModel.name;
}
