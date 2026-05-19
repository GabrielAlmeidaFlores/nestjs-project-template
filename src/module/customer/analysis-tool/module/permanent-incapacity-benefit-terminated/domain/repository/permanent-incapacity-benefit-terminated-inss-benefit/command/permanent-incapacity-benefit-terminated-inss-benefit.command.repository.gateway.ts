import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/permanent-incapacity-benefit-terminated-inss-benefit.entity';

export abstract class PermanentIncapacityBenefitTerminatedInssBenefitCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedInssBenefit(
    props: PermanentIncapacityBenefitTerminatedInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByPermanentIncapacityBenefitTerminatedId(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): TransactionType;
}
