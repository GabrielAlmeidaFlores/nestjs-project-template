import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import type { SpecialActivityInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/value-object/special-activity-inss-benefit-id.value-object';

export abstract class SpecialActivityInssBenefitCommandRepositoryGateway {
  public abstract createSpecialActivityInssBenefit(
    props: SpecialActivityInssBenefitEntity,
  ): TransactionType;

  public abstract deleteSpecialActivityInssBenefit(
    id: SpecialActivityInssBenefitId,
  ): TransactionType;
}
