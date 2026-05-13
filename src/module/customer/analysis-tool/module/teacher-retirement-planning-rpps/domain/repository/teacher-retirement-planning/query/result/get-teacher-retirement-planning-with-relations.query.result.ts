import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { GetTeacherRetirementPlanningRppsDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-document/query/result/get-teacher-retirement-planning-document.query.result';
import type { GetTeacherRetirementPlanningRppsInssBenefitQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-inss-benefit/query/result/get-teacher-retirement-planning-inss-benefit.query.result';
import type { GetTeacherRetirementPlanningRppsLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-legal-proceeding/query/result/get-teacher-retirement-planning-legal-proceeding.query.result';
import type { GetTeacherRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period/query/result/get-teacher-retirement-planning-period.query.result';
import type { GetTeacherRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-remuneration/query/result/get-teacher-retirement-planning-remuneration.query.result';
import type { GetTeacherRetirementPlanningRppsResultQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-result/query/result/get-teacher-retirement-planning-result.query.result';
import type { TeacherRetirementPlanningRppsActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import type { TeacherRetirementPlanningRppsFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import type { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

export class GetTeacherRetirementPlanningRppsWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningRppsId;
  public readonly federativeEntity: TeacherRetirementPlanningRppsFederativeEntityEnum;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly analysisName: string | null;
  public readonly currentPosition: string | null;
  public readonly activityType: TeacherRetirementPlanningRppsActivityTypeEnum;
  public readonly publicServiceStartDate: Date | null;
  public readonly careerStartDate: Date | null;
  public readonly administrativeProcessAnalysis: string | null;
  public readonly inssBenefits: GetTeacherRetirementPlanningRppsInssBenefitQueryResult[];
  public readonly legalProceedings: GetTeacherRetirementPlanningRppsLegalProceedingQueryResult[];
  public readonly documents: GetTeacherRetirementPlanningRppsDocumentQueryResult[];
  public readonly periods: GetTeacherRetirementPlanningRppsPeriodQueryResult[];
  public readonly remunerations: GetTeacherRetirementPlanningRppsRemunerationQueryResult[];
  public readonly result: GetTeacherRetirementPlanningRppsResultQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsWithRelationsQueryResult.name;
}
