import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CnisFastAnalysisClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client/enum/cnis-fast-analysis-client-type.enum';
import type { CnisFastAnalysisClientId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';

export class GetCnisFastAnalysisClientWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisClientId;
  public readonly name: string | null;
  public readonly federalDocument: FederalDocument | null;
  public readonly email: Email | null;
  public readonly phoneNumber: PhoneNumber | null;
  public readonly birthDate: Date | null;
  public readonly gender: GenderEnum | null;
  public readonly clientType: CnisFastAnalysisClientTypeEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetCnisFastAnalysisClientWithRelationsQueryResult.name;
}
