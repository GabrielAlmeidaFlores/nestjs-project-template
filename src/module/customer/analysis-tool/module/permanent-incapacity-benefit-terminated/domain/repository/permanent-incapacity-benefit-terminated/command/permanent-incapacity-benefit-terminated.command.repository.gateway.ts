import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/permanent-incapacity-benefit-terminated.entity';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';

export abstract class PermanentIncapacityBenefitTerminatedCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminated(
    props: PermanentIncapacityBenefitTerminatedEntity,
  ): TransactionType;

  public abstract updatePermanentIncapacityBenefitTerminated(
    id: PermanentIncapacityBenefitTerminatedId,
    props: PermanentIncapacityBenefitTerminatedEntity,
  ): TransactionType;

  public abstract updatePermanentIncapacityBenefitTerminatedResultId(
    id: PermanentIncapacityBenefitTerminatedId,
    resultId: PermanentIncapacityBenefitTerminatedResultId,
  ): TransactionType;
}
