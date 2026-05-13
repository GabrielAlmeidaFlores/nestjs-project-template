import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';

import type { RetirementPermanentDisabilityRejectionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/enum/retirement-permanent-disability-rejection-category.enum';
import type { RetirementPermanentDisabilityRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import type { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

export class RetirementPermanentDisabilityRejectionEntity extends BaseEntity<RetirementPermanentDisabilityRejectionId> {
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly category: RetirementPermanentDisabilityRejectionCategoryEnum | null;
  public readonly retirementPermanentDisabilityRejectionResultId: RetirementPermanentDisabilityRejectionResultId | null;
  public readonly retirementPermanentDisabilityRejectionIncapacityId: RetirementPermanentDisabilityRejectionIncapacityId | null;
  public readonly retirementPermanentDisabilityRejectionInsuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId | null;

  protected readonly _type = RetirementPermanentDisabilityRejectionEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRejectionEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.denialDate = props.denialDate ?? null;
    this.category = props.category ?? null;
    this.retirementPermanentDisabilityRejectionResultId =
      props.retirementPermanentDisabilityRejectionResultId ?? null;
    this.retirementPermanentDisabilityRejectionIncapacityId =
      props.retirementPermanentDisabilityRejectionIncapacityId ?? null;
    this.retirementPermanentDisabilityRejectionInsuredQualityId =
      props.retirementPermanentDisabilityRejectionInsuredQualityId ?? null;
  }
}
