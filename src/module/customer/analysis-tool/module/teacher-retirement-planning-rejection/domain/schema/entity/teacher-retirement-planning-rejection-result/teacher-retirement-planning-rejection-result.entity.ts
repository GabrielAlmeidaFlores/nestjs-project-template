import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';

import type { TeacherRetirementPlanningRejectionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity.props.interface';

export class TeacherRetirementPlanningRejectionResultEntity extends BaseEntity<TeacherRetirementPlanningRejectionResultId> {
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;

  protected readonly _type =
    TeacherRetirementPlanningRejectionResultEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionResultEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionResultId, props);
    this.inssDecisionAnalysis = props.inssDecisionAnalysis ?? null;
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
  }
}
