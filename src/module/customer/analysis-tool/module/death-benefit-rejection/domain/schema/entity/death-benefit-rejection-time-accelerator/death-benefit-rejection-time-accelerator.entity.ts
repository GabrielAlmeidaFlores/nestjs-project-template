import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.entity.props.interface';
import type { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import type { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import type { DeathBenefitRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-type.enum';
import type { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';

export class DeathBenefitRejectionTimeAcceleratorEntity extends BaseEntity<DeathBenefitRejectionTimeAcceleratorId> {
  public readonly type: DeathBenefitRejectionTimeAcceleratorTypeEnum;
  public readonly recognitionInss: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum;
  public readonly recognitionJudicial: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum;
  public readonly viability: DeathBenefitRejectionTimeAcceleratorViabilityEnum;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institution: string | null;
  public readonly affectsQualifyingPeriod: boolean;
  public readonly deathBenefitRejectionId: DeathBenefitRejectionId;

  protected readonly _type = DeathBenefitRejectionTimeAcceleratorEntity.name;

  public constructor(
    props: DeathBenefitRejectionTimeAcceleratorEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionTimeAcceleratorId, props);
    this.type = props.type;
    this.recognitionInss = props.recognitionInss;
    this.recognitionJudicial = props.recognitionJudicial;
    this.viability = props.viability;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.institution = props.institution ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod;
    this.deathBenefitRejectionId = props.deathBenefitRejectionId;
  }
}
