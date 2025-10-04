import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { AnalysisToolClientLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity.props.interface';

export class AnalysisToolClientLegalProceedingEntity extends BaseEntity<AnalysisToolClientLegalProceedingId> {
  public readonly legalProceedingNumber: number;
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity;

  protected readonly _type = AnalysisToolClientLegalProceedingEntity.name;

  public constructor(
    props: AnalysisToolClientLegalProceedingEntityPropsInterface,
  ) {
    super(AnalysisToolClientLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.cnisFastAnalysis = props.cnisFastAnalysis;
  }
}
