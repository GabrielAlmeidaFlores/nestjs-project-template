import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import type { GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-document/query/result/get-general-urban-retirement-analysis-period-document.query.result';
import type { GeneralUrbanRetirementAnalysisPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-service-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/enum/general-urban-retirement-analysis-period-special-time-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-category.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-degree.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/enum/general-urban-retirement-analysis-period-disability-time-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';
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
    type: GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeEnum;
    startDate: Date;
    endDate: Date;
    lawyerObservations: string | null;
    documents: GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult[];
  };
  public readonly disabilityPeriod?: {
    id: GeneralUrbanRetirementAnalysisPeriodDisabilityId;
    type: GeneralUrbanRetirementAnalysisPeriodDisabilityTimeTypeEnum;
    degree: GeneralUrbanRetirementAnalysisPeriodDisabilityDegreeEnum;
    startDate: Date;
    endDate: Date;
    category: GeneralUrbanRetirementAnalysisPeriodDisabilityCategoryEnum;
    description: string;
    dailyImpact: string;
    lawyerObservations: string | null;
    cid: {
      id: CidTenId;
      code: string;
      description: string;
    };
    documents: GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult[];
  };

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodQueryResult.name;
}
