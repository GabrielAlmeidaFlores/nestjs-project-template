import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import type { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import type { DeathBenefitGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-type.enum';
import type { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';
import type { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

export interface DeathBenefitGrantTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantTimeAcceleratorId> {
  type: DeathBenefitGrantTimeAcceleratorTypeEnum;
  recognitionInss: DeathBenefitGrantTimeAcceleratorRecognitionInssEnum;
  recognitionJudicial: DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum;
  viability: DeathBenefitGrantTimeAcceleratorViabilityEnum;
  technicalNote?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  institution?: string | null;
  affectsQualifyingPeriod: boolean;
  deathBenefitGrantId: DeathBenefitGrantId;
}
