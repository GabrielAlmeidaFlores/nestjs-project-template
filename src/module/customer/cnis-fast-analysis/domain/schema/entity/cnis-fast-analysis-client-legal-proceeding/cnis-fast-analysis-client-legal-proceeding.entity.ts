import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

import type { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisClientLegalProceedingEntityPropsInterface } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity.props.interface';

export class CnisFastAnalysisClientLegalProceedingEntity extends BaseEntity<CnisFastAnalysisClientLegalProceedingId> {
  public readonly legalProceedingNumber: number;
  public readonly client: CnisFastAnalysisClientEntity;

  protected readonly _type = CnisFastAnalysisClientLegalProceedingEntity.name;

  public constructor(
    props: CnisFastAnalysisClientLegalProceedingEntityPropsInterface,
  ) {
    super(CnisFastAnalysisClientLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.client = props.client;
  }
}
