import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { GetDisabilityRetirementPlanningDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-document/query/result/get-disability-retirement-planning-document.query.result';
import type { GetDisabilityRetirementPlanningInssBenefitQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-inss-benefit/query/result/get-disability-retirement-planning-inss-benefit.query.result';
import type { GetDisabilityRetirementPlanningLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-legal-proceeding/query/result/get-disability-retirement-planning-legal-proceeding.query.result';
import type { GetDisabilityRetirementPlanningPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period/query/result/get-disability-retirement-planning-period.query.result';
import type { GetDisabilityRetirementPlanningRemunerationQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/result/get-disability-retirement-planning-remuneration.query.result';
import type { GetDisabilityRetirementPlanningResultQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/query/result/get-disability-retirement-planning-result.query.result';
import type { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';
import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';

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
  public readonly administrativeProcessAnalysis: string | null;
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
