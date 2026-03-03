import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';
import type { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';

export abstract class JudicialCaseAnalysisResultCommandRepositoryGateway {
  public abstract createJudicialCaseAnalysisResult(
    props: JudicialCaseAnalysisResultEntity,
  ): TransactionType;

  public abstract updateJudicialCaseAnalysisResult(
    id: JudicialCaseAnalysisResultId,
    props: JudicialCaseAnalysisResultEntity,
  ): TransactionType;
}
