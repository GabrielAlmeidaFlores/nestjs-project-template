import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { TeacherRetirementPlanningEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity.props.interface';
import type { TeacherRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

export class TeacherRetirementPlanningEntity extends BaseEntity<TeacherRetirementPlanningId> {
  public readonly federativeEntity: TeacherRetirementPlanningFederativeEntityEnum;
  public readonly state: StateCodeEnum | null;
  public readonly municipality: string | null;
  public readonly analysisName: string | null;
  public readonly currentPosition: string | null;
  public readonly activityType: TeacherRetirementPlanningActivityTypeEnum;
  public readonly publicServiceStartDate: Date;
  public readonly careerStartDate: Date;
  public readonly teacherRetirementPlanningResult: TeacherRetirementPlanningResultEntity | null;

  protected readonly _type = TeacherRetirementPlanningEntity.name;

  public constructor(props: TeacherRetirementPlanningEntityPropsInterface) {
    super(TeacherRetirementPlanningId, props);
    this.federativeEntity = props.federativeEntity;
    this.state = props.state ?? null;
    this.municipality = props.municipality ?? null;
    this.analysisName = props.analysisName ?? null;
    this.currentPosition = props.currentPosition ?? null;
    this.activityType = props.activityType;
    this.publicServiceStartDate = props.publicServiceStartDate;
    this.careerStartDate = props.careerStartDate;
    this.teacherRetirementPlanningResult =
      props.teacherRetirementPlanningResult ?? null;
  }
}
