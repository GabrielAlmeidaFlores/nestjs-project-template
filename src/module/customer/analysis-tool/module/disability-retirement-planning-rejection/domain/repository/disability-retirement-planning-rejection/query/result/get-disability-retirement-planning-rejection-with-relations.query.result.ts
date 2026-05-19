import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/result/get-disability-retirement-planning-rejection-time-accelerator.query.result';
import type { DisabilityRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-category.enum';
import type { DisabilityRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-denial-reason.enum';
import type { DisabilityRetirementPlanningRejectionRetirementTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-retirement-type.enum';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity';
import type { DisabilityRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity';
import type { DisabilityRetirementPlanningRejectionPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity';
import type { DisabilityRetirementPlanningRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.entity';
import type { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity';
import type { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';

export class GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityRetirementPlanningRejectionId;
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly requestedBenefitType: string | null;
  public readonly category: DisabilityRetirementPlanningRejectionCategoryEnum | null;
  public readonly retirementType: DisabilityRetirementPlanningRejectionRetirementTypeEnum | null;
  public readonly denialReason: DisabilityRetirementPlanningRejectionDenialReasonEnum | null;
  public readonly denialReasonDescription: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly disabilityRetirementPlanningRejectionResult: DisabilityRetirementPlanningRejectionResultEntity | null;
  public readonly disabilityRetirementPlanningRejectionDocument:
    | DisabilityRetirementPlanningRejectionDocumentEntity[]
    | null;
  public readonly disabilityRetirementPlanningRejectionPeriod:
    | DisabilityRetirementPlanningRejectionPeriodEntity[]
    | null;
  public readonly disabilityRetirementPlanningRejectionPeriodDocument:
    | DisabilityRetirementPlanningRejectionPeriodDocumentEntity[]
    | null;
  public readonly disabilityRetirementPlanningRejectionPeriodEarningsHistory:
    | DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity[]
    | null;
  public readonly disabilityRetirementPlanningRejectionTimeAccelerator:
    | GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult[]
    | null;
  public readonly disabilityRetirementPlanningRejectionInssBenefit:
    | DisabilityRetirementPlanningRejectionInssBenefitEntity[]
    | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRejectionWithRelationsQueryResult.name;
}
