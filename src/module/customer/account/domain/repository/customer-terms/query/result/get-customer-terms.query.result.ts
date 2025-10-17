import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';

export class GetCustomerTermsQueryResult extends BaseBuildableObject {
  public readonly id: CustomerTermsId;
  public readonly content: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetCustomerTermsQueryResult.name;
}
