import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import type { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import type { DeathBenefitRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-type.enum';
import type { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';
import type { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

export class GetDeathBenefitRejectionTimeAcceleratorQueryResult extends BaseBuildableObject {
  public readonly id: DeathBenefitRejectionTimeAcceleratorId;
  public readonly type: DeathBenefitRejectionTimeAcceleratorTypeEnum;
  public readonly recognitionInss: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum;
  public readonly recognitionJudicial: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum;
  public readonly viability: DeathBenefitRejectionTimeAcceleratorViabilityEnum;
  public readonly technicalNote: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly institution: string | null;
  public readonly affectsQualifyingPeriod: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDeathBenefitRejectionTimeAcceleratorQueryResult.name;
}
