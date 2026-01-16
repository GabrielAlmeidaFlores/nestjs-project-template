import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import type { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';

export abstract class JudicialCaseAnalysisDocumentCommandRepositoryGateway {
  public abstract createJudicialCaseAnalysisDocument(
    props: JudicialCaseAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteJudicialCaseAnalysisDocument(
    id: JudicialCaseAnalysisDocumentId,
  ): TransactionType;
}
