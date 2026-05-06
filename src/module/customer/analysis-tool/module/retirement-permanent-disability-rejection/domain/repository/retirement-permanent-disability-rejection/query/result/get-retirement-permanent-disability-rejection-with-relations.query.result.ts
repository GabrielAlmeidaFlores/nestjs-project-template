import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPermanentDisabilityRejectionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/enum/retirement-permanent-disability-rejection-category.enum';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document.entity';
import type { RetirementPermanentDisabilityRejectionIncapacityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/retirement-permanent-disability-rejection-incapacity.entity';
import type { RetirementPermanentDisabilityRejectionIncapacityCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity';
import type { RetirementPermanentDisabilityRejectionIncapacityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity';
import type { RetirementPermanentDisabilityRejectionInsuredQualityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity';
import type { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity';
import type { RetirementPermanentDisabilityRejectionPeriodEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity';
import type { RetirementPermanentDisabilityRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity';
import type { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity';
import type { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';

export class GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPermanentDisabilityRejectionId;
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly category: RetirementPermanentDisabilityRejectionCategoryEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly retirementPermanentDisabilityRejectionResult: RetirementPermanentDisabilityRejectionResultEntity | null;
  public readonly retirementPermanentDisabilityRejectionDocument:
    | RetirementPermanentDisabilityRejectionDocumentEntity[]
    | null;
  public readonly retirementPermanentDisabilityRejectionIncapacity: RetirementPermanentDisabilityRejectionIncapacityEntity | null;
  public readonly retirementPermanentDisabilityRejectionIncapacityCid:
    | RetirementPermanentDisabilityRejectionIncapacityCidEntity[]
    | null;
  public readonly retirementPermanentDisabilityRejectionIncapacityDocument:
    | RetirementPermanentDisabilityRejectionIncapacityDocumentEntity[]
    | null;
  public readonly retirementPermanentDisabilityRejectionInsuredQuality: RetirementPermanentDisabilityRejectionInsuredQualityEntity | null;
  public readonly retirementPermanentDisabilityRejectionInsuredQualityDocument:
    | RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity[]
    | null;
  public readonly retirementPermanentDisabilityRejectionPeriod:
    | RetirementPermanentDisabilityRejectionPeriodEntity[]
    | null;
  public readonly retirementPermanentDisabilityRejectionPeriodDocument:
    | RetirementPermanentDisabilityRejectionPeriodDocumentEntity[]
    | null;
  public readonly retirementPermanentDisabilityRejectionPeriodEarningsHistory:
    | RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity[]
    | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult.name;
}
