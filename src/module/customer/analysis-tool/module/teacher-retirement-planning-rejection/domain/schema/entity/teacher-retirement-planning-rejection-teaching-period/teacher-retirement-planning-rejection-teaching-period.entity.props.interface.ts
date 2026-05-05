import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-education-level.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-establishment-type.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-function-performed.enum';
import type { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';

export interface TeacherRetirementPlanningRejectionTeachingPeriodEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionTeachingPeriodId> {
  startDate?: Date | null;
  endDate?: Date | null;
  institutionName?: string | null;
  establishmentType?: TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum | null;
  educationLevel?: TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum | null;
  functionPerformed?: TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum | null;
  rejectionReason?: string | null;
  legalBasisForRecognition?: string | null;
  favorableJurisprudence?: string | null;
  proofStrategy?: string | null;
  teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;
}
