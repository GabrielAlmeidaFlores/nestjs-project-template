import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TermsId } from '@module/customer/account/domain/schema/entity/terms/value-object/terms-id/terms-id.value-object';

export class GetTermsQueryResult extends BaseBuildableObject {
  public readonly id: TermsId;
  public readonly content: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetTermsQueryResult.name;
}
