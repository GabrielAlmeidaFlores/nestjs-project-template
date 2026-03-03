import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.entity';
import type { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';

export abstract class RuralTimelineAnalysisInssBenefitCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisInssBenefit(
    props: RuralTimelineAnalysisInssBenefitEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisInssBenefit(
    id: RuralTimelineAnalysisInssBenefitId,
  ): TransactionType;
}
