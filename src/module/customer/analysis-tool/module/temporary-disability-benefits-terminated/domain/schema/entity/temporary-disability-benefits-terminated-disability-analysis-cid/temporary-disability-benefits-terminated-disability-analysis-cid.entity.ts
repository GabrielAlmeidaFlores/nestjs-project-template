import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/value-object/temporary-disability-benefits-terminated-disability-analysis-cid-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/temporary-disability-benefits-terminated-disability-analysis-cid.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId> {
  public readonly cidTenId: string;
  public readonly temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId, props);
    this.cidTenId = props.cidTenId;
    this.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId =
      props.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;
  }
}
