import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/temporary-disability-benefits-grant-document.entity';
import type { TemporaryDisabilityBenefitsGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-inss-benefit/temporary-disability-benefits-grant-inss-benefit.entity';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.entity';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/temporary-disability-benefits-grant-insured-status-document.entity';
import type { TemporaryDisabilityBenefitsGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding.entity';
import type { TemporaryDisabilityBenefitsGrantPeriodEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.entity';
import type { TemporaryDisabilityBenefitsGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.entity';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/temporary-disability-benefits-grant-previous-benefits.entity';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/temporary-disability-benefits-grant-previous-benefits-document.entity';
import type { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.entity';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.entity';

export class GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult extends BaseBuildableObject {
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
  public readonly category: TemporaryDisabilityBenefitsGrantCategoryEnum;
  public readonly analysisName: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly temporaryDisabilityBenefitsGrantResult: TemporaryDisabilityBenefitsGrantResultEntity | null;
  public readonly temporaryDisabilityBenefitsGrantDocument:
    | TemporaryDisabilityBenefitsGrantDocumentEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantInsuredStatus:
    | TemporaryDisabilityBenefitsGrantInsuredStatusEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantInsuredStatusDocument:
    | TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantPeriod:
    | TemporaryDisabilityBenefitsGrantPeriodEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantPeriodDocument:
    | TemporaryDisabilityBenefitsGrantPeriodDocumentEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantPreviousBenefits:
    | TemporaryDisabilityBenefitsGrantPreviousBenefitsEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantPreviousBenefitsDocument:
    | TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantWorkPeriods:
    | TemporaryDisabilityBenefitsGrantWorkPeriodsEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory:
    | TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantInssBenefit:
    | TemporaryDisabilityBenefitsGrantInssBenefitEntity[]
    | null;
  public readonly temporaryDisabilityBenefitsGrantLegalProceeding:
    | TemporaryDisabilityBenefitsGrantLegalProceedingEntity[]
    | null;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult.name;
}
