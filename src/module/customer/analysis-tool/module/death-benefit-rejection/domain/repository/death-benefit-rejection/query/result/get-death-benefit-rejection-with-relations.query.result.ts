import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/death-benefit-rejection-dependent.entity';
import type { DeathBenefitRejectionDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent-document/death-benefit-rejection-dependent-document.entity';
import type { DeathBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity';
import type { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import type { DeathBenefitRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-proceeding/death-benefit-rejection-legal-proceeding.entity';
import type { DeathBenefitRejectionLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity';
import type { DeathBenefitRejectionPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/death-benefit-rejection-period.entity';
import type { DeathBenefitRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/death-benefit-rejection-period-document.entity';
import type { DeathBenefitRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.entity';
import type { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import type { DeathBenefitRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.entity';

export class GetDeathBenefitRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: DeathBenefitRejectionId;
  public readonly analysisName: string | null;
  public readonly category: DeathBenefitRejectionCategoryEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly deathBenefitRejectionResult: DeathBenefitRejectionResultEntity | null;
  public readonly deathBenefitRejectionInssBenefit:
    | DeathBenefitRejectionInssBenefitEntity[]
    | null;
  public readonly deathBenefitRejectionLegalProceeding:
    | DeathBenefitRejectionLegalProceedingEntity[]
    | null;
  public readonly deathBenefitRejectionLegalRepresentative: DeathBenefitRejectionLegalRepresentativeEntity | null;
  public readonly deathBenefitRejectionBenefitInstitutor: DeathBenefitRejectionInstitorEntity | null;
  public readonly deathBenefitRejectionDependent:
    | DeathBenefitRejectionDependentEntity[]
    | null;
  public readonly deathBenefitRejectionDependentDocument:
    | DeathBenefitRejectionDependentDocumentEntity[]
    | null;
  public readonly deathBenefitRejectionPeriod:
    | DeathBenefitRejectionPeriodEntity[]
    | null;
  public readonly deathBenefitRejectionPeriodDocument:
    | DeathBenefitRejectionPeriodDocumentEntity[]
    | null;
  public readonly deathBenefitRejectionPeriodEarningsHistory:
    | DeathBenefitRejectionPeriodEarningsHistoryEntity[]
    | null;
  public readonly deathBenefitRejectionTimeAccelerator:
    | DeathBenefitRejectionTimeAcceleratorEntity[]
    | null;

  protected override readonly _type =
    GetDeathBenefitRejectionWithRelationsQueryResult.name;
}
