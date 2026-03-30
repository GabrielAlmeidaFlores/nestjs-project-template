import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import type { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

export interface DisabilityRetirementPlanningGrantTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantTimeAcceleratorId> {
  type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum;
  recognitionInss: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum;
  viability: DisabilityRetirementPlanningGrantViabilityEnum;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  institution?: string | null;
  affectsQualifyingPeriod: boolean;
  disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;
}
