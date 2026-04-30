import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-inss-benefit/temporary-disability-benefits-terminated-inss-benefit.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedInssBenefitCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedInssBenefit(
    props: TemporaryDisabilityBenefitsTerminatedInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedId(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): TransactionType;
}
