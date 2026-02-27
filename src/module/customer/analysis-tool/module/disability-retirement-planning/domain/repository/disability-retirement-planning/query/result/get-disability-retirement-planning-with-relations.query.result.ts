import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

export class GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult.name;

  public readonly id: string;
  public readonly document: string;
}

export class GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult.name;

  public readonly id: string;
  public readonly document: string;
}

export class GetDisabilityRetirementPlanningPeriodDisabilityQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningPeriodDisabilityQueryResult.name;

  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum;
  public readonly cidTenId: string | null;
  public readonly disabilityType: RetirementPlanningDisabilityTimeTypeEnum;
  public readonly disabilityDescription: string;
  public readonly activityImpact: string;
  public readonly documents: GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult[];
}

export class GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult.name;

  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly documents: GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult[];
}

export class GetDisabilityRetirementPlanningPeriodQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningPeriodQueryResult.name;

  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly jobPosition: string;
  public readonly careerName: string;
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly disabilities: GetDisabilityRetirementPlanningPeriodDisabilityQueryResult[];
  public readonly specialTimes: GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult[];
}

export class GetDisabilityRetirementPlanningDocumentQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningDocumentQueryResult.name;

  public readonly id: string;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningDocumentTypeEnum;
}

export class GetDisabilityRetirementPlanningInssBenefitQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningInssBenefitQueryResult.name;

  public readonly id: string;
  public readonly benefitNumber: string;
}

export class GetDisabilityRetirementPlanningLegalProceedingQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningLegalProceedingQueryResult.name;

  public readonly id: string;
  public readonly legalProceedingNumber: string;
}

export class GetDisabilityRetirementPlanningRemunerationQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningRemunerationQueryResult.name;

  public readonly id: string;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;
}

export class GetDisabilityRetirementPlanningResultQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningResultQueryResult.name;

  public readonly id: string;
  public readonly disabilityRetirementPlanningCompleteAnalysis: string | null;
  public readonly disabilityRetirementPlanningSimplifiedAnalysis: string | null;
  public readonly disabilityRetirementPlanningCompleteAnalysisDownload: string | null;
}

export class GetDisabilityRetirementPlanningWithRelationsQueryResult extends BaseBuildableObject {
  protected override readonly _type = GetDisabilityRetirementPlanningWithRelationsQueryResult.name;

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
}
