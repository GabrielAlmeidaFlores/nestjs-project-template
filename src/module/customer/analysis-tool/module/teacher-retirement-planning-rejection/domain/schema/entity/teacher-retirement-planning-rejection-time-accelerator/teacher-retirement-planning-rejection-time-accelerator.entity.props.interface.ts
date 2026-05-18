import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-analysis-type.enum';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import type { TeacherRetirementPlanningRejectionViabilityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-viability.enum';
import type { TeacherRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/value-object/teacher-retirement-planning-rejection-time-accelerator-id.value-object';

export interface TeacherRetirementPlanningRejectionTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionTimeAcceleratorId> {
  timeType?: TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum | null;
  institution?: string | null;
  recognitionInss?: TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum | null;
  affectsQualifyingPeriod?: boolean | null;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  gracePeriod?: string | null;
  viability?: TeacherRetirementPlanningRejectionViabilityEnum | null;
  teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;
}
