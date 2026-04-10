import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/death-benefit-grant-dependent.entity';
import type { DeathBenefitGrantDependentDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent-document/death-benefit-grant-dependent-document.entity';
import type { DeathBenefitGrantDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-document/death-benefit-grant-document.entity';
import type { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';
import type { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import type { DeathBenefitGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-proceeding/death-benefit-grant-legal-proceeding.entity';
import type { DeathBenefitGrantLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity';
import type { DeathBenefitGrantPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity';
import type { DeathBenefitGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-document/death-benefit-grant-period-document.entity';
import type { DeathBenefitGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.entity';
import type { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';

export class GetDeathBenefitGrantWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: DeathBenefitGrantId;
  public readonly analysisName: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly deathBenefitGrantResult: DeathBenefitGrantResultEntity | null;
  public readonly deathBenefitGrantDocument:
    | DeathBenefitGrantDocumentEntity[]
    | null;
  public readonly deathBenefitGrantInssBenefit:
    | DeathBenefitGrantInssBenefitEntity[]
    | null;
  public readonly deathBenefitGrantLegalProceeding:
    | DeathBenefitGrantLegalProceedingEntity[]
    | null;
  public readonly deathBenefitGrantLegalRepresentative: DeathBenefitGrantLegalRepresentativeEntity | null;
  public readonly deathBenefitGrantBenefitInstitutor: DeathBenefitGrantInstitorEntity | null;
  public readonly deathBenefitGrantDependent:
    | DeathBenefitGrantDependentEntity[]
    | null;
  public readonly deathBenefitGrantDependentDocument:
    | DeathBenefitGrantDependentDocumentEntity[]
    | null;
  public readonly deathBenefitGrantPeriod:
    | DeathBenefitGrantPeriodEntity[]
    | null;
  public readonly deathBenefitGrantPeriodDocument:
    | DeathBenefitGrantPeriodDocumentEntity[]
    | null;
  public readonly deathBenefitGrantPeriodEarningsHistory:
    | DeathBenefitGrantPeriodEarningsHistoryEntity[]
    | null;

  protected override readonly _type =
    GetDeathBenefitGrantWithRelationsQueryResult.name;
}
