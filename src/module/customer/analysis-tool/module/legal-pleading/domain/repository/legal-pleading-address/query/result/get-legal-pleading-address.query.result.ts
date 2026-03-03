import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { LegalPleadingAddressId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';

export class GetLegalPleadingAddressQueryResult extends BaseBuildableObject {
  public readonly id: LegalPleadingAddressId;
  public readonly postalCode: PostalCode;
  public readonly stateCode: StateCodeEnum;
  public readonly city: string;
  public readonly neighborhood: string;
  public readonly street: string;
  public readonly addressNumber: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetLegalPleadingAddressQueryResult.name;
}
