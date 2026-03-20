import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import type { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';

export class GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantPeriodDocumentId;
  public readonly document: string;
  public readonly generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantPeriodDocumentQueryResult.name;
}
