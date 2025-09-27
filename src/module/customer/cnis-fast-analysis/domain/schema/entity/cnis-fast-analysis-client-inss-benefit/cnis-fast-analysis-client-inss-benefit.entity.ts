import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisClientInssBenefitId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/value-object/cnis-fast-analysis-client-inss-benefit-id/cnis-fast-analysis-client-inss-benefit-id.value-object';

import type { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisClientInssBenefitEntityPropsInterface } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-inss-benefit/cnis-fast-analysis-client-inss-benefit.entity.props.interface';

export class CnisFastAnalysisClientInssBenefitEntity extends BaseEntity<CnisFastAnalysisClientInssBenefitId> {
  public readonly inssBenefitNumber: number;
  public readonly cnisFastAnalysisClient: CnisFastAnalysisClientEntity;

  protected readonly _type = CnisFastAnalysisClientInssBenefitEntity.name;

  public constructor(
    props: CnisFastAnalysisClientInssBenefitEntityPropsInterface,
  ) {
    super(CnisFastAnalysisClientInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.cnisFastAnalysisClient = props.cnisFastAnalysisClient;
  }
}
