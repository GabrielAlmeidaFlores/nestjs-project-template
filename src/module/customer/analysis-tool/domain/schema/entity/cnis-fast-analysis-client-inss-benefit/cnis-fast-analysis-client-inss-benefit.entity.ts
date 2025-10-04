import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisClientInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity.props.interface';

export class CnisFastAnalysisClientInssBenefitEntity extends BaseEntity<CnisFastAnalysisClientInssBenefitId> {
  public readonly inssBenefitNumber: number;
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity;

  protected readonly _type = CnisFastAnalysisClientInssBenefitEntity.name;

  public constructor(
    props: CnisFastAnalysisClientInssBenefitEntityPropsInterface,
  ) {
    super(CnisFastAnalysisClientInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.cnisFastAnalysis = props.cnisFastAnalysis;
  }
}
