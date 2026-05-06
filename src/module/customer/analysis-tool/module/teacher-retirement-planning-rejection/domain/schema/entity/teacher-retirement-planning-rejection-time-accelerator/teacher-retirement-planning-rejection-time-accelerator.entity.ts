import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';

import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-analysis-type.enum';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import type { TeacherRetirementPlanningRejectionViabilityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-viability.enum';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/teacher-retirement-planning-rejection-time-accelerator.entity.props.interface';

export class TeacherRetirementPlanningRejectionTimeAcceleratorEntity extends BaseEntity<TeacherRetirementPlanningRejectionTimeAcceleratorId> {
  public readonly timeType: TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum | null;
  public readonly institution: string | null;
  public readonly recognitionInss: TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum | null;
  public readonly affectsQualifyingPeriod: boolean | null;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly gracePeriod: string | null;
  public readonly viability: TeacherRetirementPlanningRejectionViabilityEnum | null;
  public readonly teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionTimeAcceleratorEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionTimeAcceleratorEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionTimeAcceleratorId, props);
    this.timeType = props.timeType ?? null;
    this.institution = props.institution ?? null;
    this.recognitionInss = props.recognitionInss ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod ?? null;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.viability = props.viability ?? null;
    this.teacherRetirementPlanningRejectionId =
      props.teacherRetirementPlanningRejectionId;
  }
}
