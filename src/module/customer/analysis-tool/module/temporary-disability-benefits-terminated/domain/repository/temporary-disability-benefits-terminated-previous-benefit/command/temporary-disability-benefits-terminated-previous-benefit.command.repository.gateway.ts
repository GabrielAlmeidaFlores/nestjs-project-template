import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/temporary-disability-benefits-terminated-previous-benefit.entity';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';

export abstract class TemporaryDisabilityBenefitsTerminatedPreviousBenefitCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedPreviousBenefit(
    props: TemporaryDisabilityBenefitsTerminatedPreviousBenefitEntity,
  ): TransactionType;

  public abstract deleteTemporaryDisabilityBenefitsTerminatedPreviousBenefit(
    id: TemporaryDisabilityBenefitsTerminatedPreviousBenefitId,
  ): TransactionType;
}
