import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

export class GetAnalysisToolClientQueryResult extends BaseBuildableObject {
  public readonly id: AnalysisToolClientId;
  public readonly name: string | null;
  public readonly federalDocument: FederalDocument | null;
  public readonly email: Email | null;
  public readonly corporateEmail: Email | null;
  public readonly inssPassword: string | null;
  public readonly phoneNumber: PhoneNumber | null;
  public readonly birthDate: Date | null;
  public readonly gender: GenderEnum | null;
  public readonly clientType: AnalysisToolClientTypeEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetAnalysisToolClientQueryResult.name;
}
