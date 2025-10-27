import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AnalysisToolClientInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/analysis-tool-client-inss-benefit.entity';
import type { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';

export abstract class AnalysisToolClientInssBenefitCommandRepositoryGateway {
  public abstract createAnalysisToolClientInssBenefit(
    props: AnalysisToolClientInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAnalysisToolClientInssBenefit(
    id: AnalysisToolClientInssBenefitId,
  ): TransactionType;
}
