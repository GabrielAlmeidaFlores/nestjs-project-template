import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { GetTeacherRetirementPlanningDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-document/query/result/get-teacher-retirement-planning-document.query.result';
import type { GetTeacherRetirementPlanningInssBenefitQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-inss-benefit/query/result/get-teacher-retirement-planning-inss-benefit.query.result';
import type { GetTeacherRetirementPlanningLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-legal-proceeding/query/result/get-teacher-retirement-planning-legal-proceeding.query.result';
import type { GetTeacherRetirementPlanningPeriodQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/query/result/get-teacher-retirement-planning-period.query.result';
import type { GetTeacherRetirementPlanningRemunerationQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/result/get-teacher-retirement-planning-remuneration.query.result';
import type { GetTeacherRetirementPlanningResultQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/query/result/get-teacher-retirement-planning-result.query.result';
import type { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import type { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import type { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

export class GetTeacherRetirementPlanningWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningId;
  public readonly federativeEntity: TeacherRetirementPlanningFederativeEntityEnum;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly analysisName: string | null;
  public readonly currentPosition: string | null;
  public readonly activityType: TeacherRetirementPlanningActivityTypeEnum;
  public readonly publicServiceStartDate: Date;
  public readonly careerStartDate: Date;
  public readonly inssBenefits: GetTeacherRetirementPlanningInssBenefitQueryResult[];
  public readonly legalProceedings: GetTeacherRetirementPlanningLegalProceedingQueryResult[];
  public readonly documents: GetTeacherRetirementPlanningDocumentQueryResult[];
  public readonly periods: GetTeacherRetirementPlanningPeriodQueryResult[];
  public readonly remunerations: GetTeacherRetirementPlanningRemunerationQueryResult[];
  public readonly result: GetTeacherRetirementPlanningResultQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningWithRelationsQueryResult.name;
}
