import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/general-urban-retirement-analysis-document.entity';
import type { GeneralUrbanRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/value-object/general-urban-retirement-analysis-document-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisDocument(
    props: GeneralUrbanRetirementAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysisDocument(
    id: GeneralUrbanRetirementAnalysisDocumentId,
  ): TransactionType;
}
