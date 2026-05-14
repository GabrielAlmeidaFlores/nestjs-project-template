import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/permanent-incapacity-benefit-terminated-disability-analysis-cid.entity';

export abstract class PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedDisabilityAnalysisCid(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity,
  ): TransactionType;

  public abstract deleteAllByPermanentIncapacityBenefitTerminatedDisabilityAnalysisId(
    permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId,
  ): TransactionType;
}
