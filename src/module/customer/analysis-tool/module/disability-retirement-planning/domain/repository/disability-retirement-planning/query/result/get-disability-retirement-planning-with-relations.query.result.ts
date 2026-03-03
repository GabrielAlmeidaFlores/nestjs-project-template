import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';
import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import type { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';
import type { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import type { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import type { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

export class GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult.name;
}

export class GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult.name;
}

export class GetDisabilityRetirementPlanningPeriodDisabilityQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum;
  public readonly disabilityCategory: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;
  public readonly cidTenId: string | null;
  public readonly disabilityType: RetirementPlanningDisabilityTimeTypeEnum;
  public readonly disabilityDescription: string;
  public readonly activityImpact: string;
  public readonly documents: GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityQueryResult.name;
}

export class GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly documents: GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult.name;
}

export class GetDisabilityRetirementPlanningPeriodQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly jobPosition: string;
  public readonly careerName: string;
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly disabilities: GetDisabilityRetirementPlanningPeriodDisabilityQueryResult[];
  public readonly specialTimes: GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodQueryResult.name;
}

export class GetDisabilityRetirementPlanningDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningDocumentTypeEnum;

  protected override readonly _type =
    GetDisabilityRetirementPlanningDocumentQueryResult.name;
}

export class GetDisabilityRetirementPlanningInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly benefitNumber: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningInssBenefitQueryResult.name;
}

export class GetDisabilityRetirementPlanningLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly legalProceedingNumber: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningLegalProceedingQueryResult.name;
}

export class GetDisabilityRetirementPlanningRemunerationQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRemunerationQueryResult.name;
}

export class GetDisabilityRetirementPlanningResultQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly disabilityRetirementPlanningCompleteAnalysis: string | null;
  public readonly disabilityRetirementPlanningSimplifiedAnalysis: string | null;
  public readonly disabilityRetirementPlanningCompleteAnalysisDownload:
    | string
    | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningResultQueryResult.name;
}

export class GetDisabilityRetirementPlanningWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityRetirementPlanningId;
  public readonly currentPosition: string;
  public readonly federativeEntity: FederativeEntityEnum;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly publicServiceStartDate: Date;
  public readonly careerStartDate: Date;
  public readonly analysisName: string | null;
  public readonly longTimeDisability: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly result: GetDisabilityRetirementPlanningResultQueryResult | null;
  public readonly periods: GetDisabilityRetirementPlanningPeriodQueryResult[];
  public readonly documents: GetDisabilityRetirementPlanningDocumentQueryResult[];
  public readonly inssBenefits: GetDisabilityRetirementPlanningInssBenefitQueryResult[];
  public readonly legalProceedings: GetDisabilityRetirementPlanningLegalProceedingQueryResult[];
  public readonly remunerations: GetDisabilityRetirementPlanningRemunerationQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningWithRelationsQueryResult.name;
}
