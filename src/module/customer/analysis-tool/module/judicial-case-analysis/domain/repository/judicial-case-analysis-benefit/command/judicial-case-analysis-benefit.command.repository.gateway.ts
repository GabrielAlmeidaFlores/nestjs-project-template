import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { JudicialCaseAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/judicial-case-analysis-benefit.entity';
import type { JudicialCaseAnalysisBenefitId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-benefit/value-object/judicial-case-analysis-benefit-id/judicial-case-analysis-benefit-id.value-object';

export abstract class JudicialCaseAnalysisBenefitCommandRepositoryGateway {
  public abstract createJudicialCaseAnalysisBenefit(
    props: JudicialCaseAnalysisBenefitEntity,
  ): TransactionType;

  public abstract deleteJudicialCaseAnalysisBenefit(
    id: JudicialCaseAnalysisBenefitId,
  ): TransactionType;
}
