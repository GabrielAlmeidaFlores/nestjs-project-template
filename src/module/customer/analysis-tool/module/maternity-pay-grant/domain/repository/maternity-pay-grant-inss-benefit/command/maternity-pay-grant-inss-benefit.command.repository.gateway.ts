import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity';

export abstract class MaternityPayGrantInssBenefitCommandRepositoryGateway {
  public abstract createMaternityPayGrantInssBenefit(
    props: MaternityPayGrantInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType;
}
