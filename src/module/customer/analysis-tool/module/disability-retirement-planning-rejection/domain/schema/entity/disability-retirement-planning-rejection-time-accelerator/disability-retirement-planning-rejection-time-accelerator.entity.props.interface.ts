import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-judicial.enum';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-type.enum';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-viability.enum';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

export interface DisabilityRetirementPlanningRejectionTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRejectionTimeAcceleratorId> {
  type: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum;
  recognitionInss: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum;
  viability: DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  institution?: string | null;
  affectsQualifyingPeriod: boolean;
  disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;
}
