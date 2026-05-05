import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';

import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-education-level.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-establishment-type.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-function-performed.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/teacher-retirement-planning-rejection-teaching-period.entity.props.interface';

export class TeacherRetirementPlanningRejectionTeachingPeriodEntity extends BaseEntity<TeacherRetirementPlanningRejectionTeachingPeriodId> {
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institutionName: string | null;
  public readonly establishmentType: TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum | null;
  public readonly educationLevel: TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum | null;
  public readonly functionPerformed: TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum | null;
  public readonly rejectionReason: string | null;
  public readonly legalBasisForRecognition: string | null;
  public readonly favorableJurisprudence: string | null;
  public readonly proofStrategy: string | null;
  public readonly teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionTeachingPeriodEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionTeachingPeriodId, props);
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.institutionName = props.institutionName ?? null;
    this.establishmentType = props.establishmentType ?? null;
    this.educationLevel = props.educationLevel ?? null;
    this.functionPerformed = props.functionPerformed ?? null;
    this.rejectionReason = props.rejectionReason ?? null;
    this.legalBasisForRecognition = props.legalBasisForRecognition ?? null;
    this.favorableJurisprudence = props.favorableJurisprudence ?? null;
    this.proofStrategy = props.proofStrategy ?? null;
    this.teacherRetirementPlanningRejectionId =
      props.teacherRetirementPlanningRejectionId;
  }
}
