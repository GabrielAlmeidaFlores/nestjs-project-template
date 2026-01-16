import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { JudicialCaseAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/judicial-case-analysis-legal-proceeding.entity';
import type { JudicialCaseAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-legal-proceeding/value-object/judicial-case-analysis-legal-proceeding-id/judicial-case-analysis-legal-proceeding-id.value-object';

export abstract class JudicialCaseAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createJudicialCaseAnalysisLegalProceeding(
    props: JudicialCaseAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteJudicialCaseAnalysisLegalProceeding(
    id: JudicialCaseAnalysisLegalProceedingId,
  ): TransactionType;
}

