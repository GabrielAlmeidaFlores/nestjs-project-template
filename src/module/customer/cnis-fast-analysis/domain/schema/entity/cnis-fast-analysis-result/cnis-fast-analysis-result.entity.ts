import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisResultId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CnisFastAnalysisResultEntityPropsInterface } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity.props.interface';

export class CnisFastAnalysisResultEntity extends BaseEntity<CnisFastAnalysisResultId> {
  public readonly clientName: string;
  public readonly clientFederalDocument: FederalDocument;
  public readonly clientBirthDate: Date;
  public readonly clientLastAffiliationDate: Date;
  public readonly cnisAiAnalysis: string;

  protected readonly _type = CnisFastAnalysisResultEntity.name;

  public constructor(props: CnisFastAnalysisResultEntityPropsInterface) {
    super(CnisFastAnalysisResultId, props);

    this.clientName = props.clientName;
    this.clientFederalDocument = props.clientFederalDocument;
    this.clientBirthDate = props.clientBirthDate;
    this.clientLastAffiliationDate = props.clientLastAffiliationDate;
    this.cnisAiAnalysis = props.cnisAiAnalysis;
  }
}
