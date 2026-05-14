import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/permanent-incapacity-benefit-terminated-insured-status.entity';

export abstract class PermanentIncapacityBenefitTerminatedInsuredStatusCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedInsuredStatus(
    props: PermanentIncapacityBenefitTerminatedInsuredStatusEntity,
  ): TransactionType;

  public abstract deleteAllByPermanentIncapacityBenefitTerminatedId(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): TransactionType;
}
