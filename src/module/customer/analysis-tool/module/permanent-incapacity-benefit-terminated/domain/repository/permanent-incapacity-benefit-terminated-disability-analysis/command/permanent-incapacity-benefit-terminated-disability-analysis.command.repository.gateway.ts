import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/permanent-incapacity-benefit-terminated-disability-analysis.entity';

export abstract class PermanentIncapacityBenefitTerminatedDisabilityAnalysisCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedDisabilityAnalysis(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntity,
  ): TransactionType;

  public abstract deleteAllByPermanentIncapacityBenefitTerminatedId(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): TransactionType;
}
