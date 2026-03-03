import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import type { JudicialCaseAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/enum/judicial-case-analysis-document-type.enum';
import type { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';

export interface JudicialCaseAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<JudicialCaseAnalysisDocumentId> {
  document: string;
  type: JudicialCaseAnalysisDocumentTypeEnum;
  judicialCaseAnalysis: JudicialCaseAnalysisEntity;
}
