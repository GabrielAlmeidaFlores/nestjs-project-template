import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantTimeAcceleratorEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.entity.props.interface';
import type { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import type { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import type { DeathBenefitGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-type.enum';
import type { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';

export class DeathBenefitGrantTimeAcceleratorEntity extends BaseEntity<DeathBenefitGrantTimeAcceleratorId> {
  public readonly type: DeathBenefitGrantTimeAcceleratorTypeEnum;
  public readonly recognitionInss: DeathBenefitGrantTimeAcceleratorRecognitionInssEnum;
  public readonly recognitionJudicial: DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum;
  public readonly viability: DeathBenefitGrantTimeAcceleratorViabilityEnum;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institution: string | null;
  public readonly affectsQualifyingPeriod: boolean;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantTimeAcceleratorEntity.name;

  public constructor(
    props: DeathBenefitGrantTimeAcceleratorEntityPropsInterface,
  ) {
    super(DeathBenefitGrantTimeAcceleratorId, props);
    this.type = props.type;
    this.recognitionInss = props.recognitionInss;
    this.recognitionJudicial = props.recognitionJudicial;
    this.viability = props.viability;
    this.technicalNote = props.technicalNote ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.institution = props.institution ?? null;
    this.affectsQualifyingPeriod = props.affectsQualifyingPeriod;
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
