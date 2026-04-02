import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.entity';
import type { DisabilityRetirementPlanningGrantDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity';
import type { DisabilityRetirementPlanningGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.entity';
import type { DisabilityRetirementPlanningGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity';
import type { DisabilityRetirementPlanningGrantPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity';
import type { DisabilityRetirementPlanningGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.entity';
import type { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.entity';
import type { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity';

export class GetDisabilityRetirementPlanningGrantWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityRetirementPlanningGrantId;
  public readonly category: DisabilityRetirementPlanningGrantCategoryEnum;
  public readonly analysisName: string | null;
  public readonly longPrizeDisability: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly disabilityRetirementPlanningGrantResult: DisabilityRetirementPlanningGrantResultEntity | null;
  public readonly disabilityRetirementPlanningGrantDocument:
    | DisabilityRetirementPlanningGrantDocumentEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantInssBenefit:
    | DisabilityRetirementPlanningGrantInssBenefitEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantLegalProceeding:
    | DisabilityRetirementPlanningGrantLegalProceedingEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantPeriod:
    | DisabilityRetirementPlanningGrantPeriodEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantPeriodDocument:
    | DisabilityRetirementPlanningGrantPeriodDocumentEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantPeriodEarningsHistory:
    | DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantDisabilityPeriod:
    | DisabilityRetirementPlanningGrantDisabilityPeriodEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantDisabilityPeriodDocument:
    | DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity[]
    | null;
  public readonly disabilityRetirementPlanningGrantTimeAccelerator:
    | DisabilityRetirementPlanningGrantTimeAcceleratorEntity[]
    | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantWithRelationsQueryResult.name;
}
