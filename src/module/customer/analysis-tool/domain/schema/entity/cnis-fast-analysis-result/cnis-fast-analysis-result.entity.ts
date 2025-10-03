import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CnisFastAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity.props.interface';

export class CnisFastAnalysisResultEntity extends BaseEntity<CnisFastAnalysisResultId> {
  public readonly clientName: string | null;
  public readonly clientFederalDocument: FederalDocument | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientLastAffiliationDate: Date | null;
  public readonly cnisAiAnalysis: string | null;

  protected readonly _type = CnisFastAnalysisResultEntity.name;

  public constructor(props: CnisFastAnalysisResultEntityPropsInterface) {
    super(CnisFastAnalysisResultId, props);

    this.clientName = props.clientName ?? null;
    this.clientFederalDocument = props.clientFederalDocument ?? null;
    this.clientBirthDate = props.clientBirthDate ?? null;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate ?? null;
    this.cnisAiAnalysis = props.cnisAiAnalysis ?? null;
  }
}
