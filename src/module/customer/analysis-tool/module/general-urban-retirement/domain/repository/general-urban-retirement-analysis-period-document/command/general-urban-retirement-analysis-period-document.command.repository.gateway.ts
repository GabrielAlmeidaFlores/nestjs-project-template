import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/general-urban-retirement-analysis-period-document.entity';
import type { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisPeriodDocument(
    props: GeneralUrbanRetirementAnalysisPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysisPeriodDocument(
    id: GeneralUrbanRetirementAnalysisPeriodDocumentId,
  ): TransactionType;
}
