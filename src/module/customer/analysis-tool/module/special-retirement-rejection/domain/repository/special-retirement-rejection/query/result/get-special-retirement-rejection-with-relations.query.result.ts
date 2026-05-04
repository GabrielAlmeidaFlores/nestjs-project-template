import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/special-retirement-rejection-document.entity';
import type { SpecialRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-inss-benefit/special-retirement-rejection-inss-benefit.entity';
import type { SpecialRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.entity';
import type { SpecialRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity';
import type { SpecialRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/special-retirement-rejection-work-period.entity';
import type { SpecialRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/special-retirement-rejection-work-period-document.entity';
import type { SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/special-retirement-rejection-work-period-earnings-history.entity';
import type { SpecialRetirementRejectionWorkSpecialPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.entity';
import type { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/special-retirement-rejection-work-special-period-legal-framework.entity';

export class GetSpecialRetirementRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementRejectionId;
  public readonly specialRetirementRejectionId: SpecialRetirementRejectionId;
  public readonly analysisName: string | null;
  public readonly category: string | null;
  public readonly requirementStartDate: Date | null;
  public readonly rejectionDate: Date | null;
  public readonly harmfulAgents: string[] | null;
  public readonly otherAgents: string | null;
  public readonly rejectionReason: string | null;
  public readonly otherRejectionReason: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly specialRetirementRejectionResult: SpecialRetirementRejectionResultEntity | null;
  public readonly specialRetirementRejectionInssBenefit:
    | SpecialRetirementRejectionInssBenefitEntity[]
    | null;
  public readonly specialRetirementRejectionDocument:
    | SpecialRetirementRejectionDocumentEntity[]
    | null;
  public readonly specialRetirementRejectionLegalProceeding:
    | SpecialRetirementRejectionLegalProceedingEntity[]
    | null;
  public readonly specialRetirementRejectionWorkPeriod:
    | SpecialRetirementRejectionWorkPeriodEntity[]
    | null;
  public readonly specialRetirementRejectionWorkPeriodDocument:
    | SpecialRetirementRejectionWorkPeriodDocumentEntity[]
    | null;
  public readonly specialRetirementRejectionWorkPeriodEarningsHistory:
    | SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity[]
    | null;
  public readonly specialRetirementRejectionWorkSpecialPeriod:
    | SpecialRetirementRejectionWorkSpecialPeriodEntity[]
    | null;
  public readonly specialRetirementRejectionWorkSpecialPeriodLegalFramework:
    | SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity[]
    | null;

  protected override readonly _type =
    GetSpecialRetirementRejectionWithRelationsQueryResult.name;
}
