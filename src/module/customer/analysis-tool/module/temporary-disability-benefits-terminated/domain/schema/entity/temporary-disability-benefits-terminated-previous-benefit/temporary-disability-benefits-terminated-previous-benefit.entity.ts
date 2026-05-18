import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/temporary-disability-benefits-terminated-previous-benefit.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedPreviousBenefitId> {
  public readonly benefitNumber: string;
  public readonly temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedPreviousBenefitId, props);
    this.benefitNumber = props.benefitNumber;
    this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId =
      props.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;
  }
}
