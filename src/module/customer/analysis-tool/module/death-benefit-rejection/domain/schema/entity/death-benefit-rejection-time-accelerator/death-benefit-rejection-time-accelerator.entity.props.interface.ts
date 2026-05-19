import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import type { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import type { DeathBenefitRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-type.enum';
import type { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';
import type { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

export interface DeathBenefitRejectionTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionTimeAcceleratorId> {
  type: DeathBenefitRejectionTimeAcceleratorTypeEnum;
  recognitionInss: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum;
  viability: DeathBenefitRejectionTimeAcceleratorViabilityEnum;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  institution?: string | null;
  affectsQualifyingPeriod: boolean;
  deathBenefitRejectionId: DeathBenefitRejectionId;
}
