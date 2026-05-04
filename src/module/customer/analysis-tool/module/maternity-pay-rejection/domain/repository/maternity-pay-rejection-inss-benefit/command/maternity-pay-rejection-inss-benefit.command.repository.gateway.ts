import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.entity';

export abstract class MaternityPayRejectionInssBenefitCommandRepositoryGateway {
  public abstract createMaternityPayRejectionInssBenefit(
    props: MaternityPayRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllMaternityPayRejectionInssBenefitByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType;
}
