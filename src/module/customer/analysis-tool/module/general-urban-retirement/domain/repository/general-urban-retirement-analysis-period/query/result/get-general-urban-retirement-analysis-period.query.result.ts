import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-service-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';
import type { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';

export class GetGeneralUrbanRetirementAnalysisPeriodQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementAnalysisPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly jobPosition: string;
  public readonly career: string;
  public readonly serviceType: GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly specialTimePeriod?: {
    id: GeneralUrbanRetirementAnalysisPeriodSpecialTimeId;
    documentIds?: GeneralUrbanRetirementAnalysisPeriodDocumentId[];
  };
  public readonly disabilityPeriod?: {
    id: GeneralUrbanRetirementAnalysisPeriodDisabilityId;
    documentIds: GeneralUrbanRetirementAnalysisPeriodDocumentId[];
  };

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodQueryResult.name;
}
