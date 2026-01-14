import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AdministrativeProcedureInssAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.entity';
import type { AdministrativeProcedureInssAnalysisDocumentId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/value-object/administrative-procedure-inss-analysis-document-id/administrative-procedure-inss-analysis-document-id.value-object';

export abstract class AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway {
  public abstract createAdministrativeProcedureInssAnalysisDocument(
    props: AdministrativeProcedureInssAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteAdministrativeProcedureInssAnalysisDocument(
    id: AdministrativeProcedureInssAnalysisDocumentId,
  ): TransactionType;
}
