import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitBenefitInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/death-benefit-benefit-institutor.entity';
import type { DeathBenefitDependentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/death-benefit-dependent.entity';
import type { DeathBenefitDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent-document/death-benefit-dependent-document.entity';
import type { DeathBenefitDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-document/death-benefit-document.entity';
import type { DeathBenefitInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/death-benefit-inss-benefit.entity';
import type { DeathBenefitLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/death-benefit-legal-proceeding.entity';
import type { DeathBenefitLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/death-benefit-legal-representative.entity';
import type { DeathBenefitPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/death-benefit-period.entity';
import type { DeathBenefitPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/death-benefit-period-document.entity';
import type { DeathBenefitPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/death-benefit-period-earnings-history.entity';
import type { DeathBenefitResultEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/death-benefit-result.entity';

export class GetDeathBenefitWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: DeathBenefitId;
  public readonly analysisName: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly deathBenefitResult: DeathBenefitResultEntity | null;
  public readonly deathBenefitDocument: DeathBenefitDocumentEntity[] | null;
  public readonly deathBenefitInssBenefit:
    | DeathBenefitInssBenefitEntity[]
    | null;
  public readonly deathBenefitLegalProceeding:
    | DeathBenefitLegalProceedingEntity[]
    | null;
  public readonly deathBenefitLegalRepresentative: DeathBenefitLegalRepresentativeEntity | null;
  public readonly deathBenefitBenefitInstitutor: DeathBenefitBenefitInstitorEntity | null;
  public readonly deathBenefitDependent: DeathBenefitDependentEntity[] | null;
  public readonly deathBenefitDependentDocument:
    | DeathBenefitDependentDocumentEntity[]
    | null;
  public readonly deathBenefitPeriod: DeathBenefitPeriodEntity[] | null;
  public readonly deathBenefitPeriodDocument:
    | DeathBenefitPeriodDocumentEntity[]
    | null;
  public readonly deathBenefitPeriodEarningsHistory:
    | DeathBenefitPeriodEarningsHistoryEntity[]
    | null;

  protected override readonly _type =
    GetDeathBenefitWithRelationsQueryResult.name;
}
