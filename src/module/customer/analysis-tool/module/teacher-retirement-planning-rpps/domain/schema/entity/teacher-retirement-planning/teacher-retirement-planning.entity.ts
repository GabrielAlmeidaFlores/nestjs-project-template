import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { TeacherRetirementPlanningRppsActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import type { TeacherRetirementPlanningRppsFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import type { TeacherRetirementPlanningRppsEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity.props.interface';
import type { TeacherRetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

export class TeacherRetirementPlanningRppsEntity extends BaseEntity<TeacherRetirementPlanningRppsId> {
  public readonly federativeEntity: TeacherRetirementPlanningRppsFederativeEntityEnum;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly analysisName: string | null;
  public readonly currentPosition: string | null;
  public readonly activityType: TeacherRetirementPlanningRppsActivityTypeEnum;
  public readonly publicServiceStartDate: Date | null;
  public readonly careerStartDate: Date | null;
  public readonly administrativeProcessAnalysis: string | null;
  public readonly teacherRetirementPlanningResult: TeacherRetirementPlanningRppsResultEntity | null;

  protected readonly _type = TeacherRetirementPlanningRppsEntity.name;

  public constructor(props: TeacherRetirementPlanningRppsEntityPropsInterface) {
    super(TeacherRetirementPlanningRppsId, props);
    this.federativeEntity = props.federativeEntity;
    this.state = props.state ?? null;
    this.municipality = props.municipality ?? null;
    this.analysisName = props.analysisName ?? null;
    this.currentPosition = props.currentPosition ?? null;
    this.activityType = props.activityType;
    this.publicServiceStartDate = props.publicServiceStartDate ?? null;
    this.careerStartDate = props.careerStartDate ?? null;
    this.administrativeProcessAnalysis =
      props.administrativeProcessAnalysis ?? null;
    this.teacherRetirementPlanningResult =
      props.teacherRetirementPlanningResult ?? null;
  }
}
