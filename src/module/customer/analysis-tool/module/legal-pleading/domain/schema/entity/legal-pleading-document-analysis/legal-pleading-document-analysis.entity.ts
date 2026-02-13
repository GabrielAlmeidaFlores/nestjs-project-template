import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { LegalPleadingDocumentAnalysisId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document-analysis/value-object/legal-pleading-document-analysis/legal-pleading-document-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { LegalPleadingDocumentAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity.props.interface';

export class LegalPleadingDocumentAnalysisEntity extends BaseEntity<LegalPleadingDocumentAnalysisId> {
  @Description('Análise do documento legal anexado à petição.')
  public readonly analysis: string | null;

  protected readonly _type = LegalPleadingDocumentAnalysisEntity.name;

  public constructor(props: LegalPleadingDocumentAnalysisEntityPropsInterface) {
    super(LegalPleadingDocumentAnalysisId, props);

    this.analysis = props.analysis ?? null;
  }
}
