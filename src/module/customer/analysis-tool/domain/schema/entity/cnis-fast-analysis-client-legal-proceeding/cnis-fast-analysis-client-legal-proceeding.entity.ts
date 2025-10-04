import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/value-object/cnis-fast-analysis-client-legal-proceeding-id/cnis-fast-analysis-client-legal-proceeding-id.value-object';

import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisClientLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client-legal-proceeding/cnis-fast-analysis-client-legal-proceeding.entity.props.interface';

export class CnisFastAnalysisClientLegalProceedingEntity extends BaseEntity<CnisFastAnalysisClientLegalProceedingId> {
  public readonly legalProceedingNumber: number;
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity;

  protected readonly _type = CnisFastAnalysisClientLegalProceedingEntity.name;

  public constructor(
    props: CnisFastAnalysisClientLegalProceedingEntityPropsInterface,
  ) {
    super(CnisFastAnalysisClientLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.cnisFastAnalysis = props.cnisFastAnalysis;
  }
}
