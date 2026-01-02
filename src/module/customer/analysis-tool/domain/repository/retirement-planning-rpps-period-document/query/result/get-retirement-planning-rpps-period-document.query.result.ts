import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import type { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import type { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';

export class GetRetirementPlanningRppsPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsPeriodDocumentId;
  public readonly documentType: RetirementPlanningDocumentTypeEnum;
  public readonly document: Base64;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodDocumentQueryResult.name;
}
