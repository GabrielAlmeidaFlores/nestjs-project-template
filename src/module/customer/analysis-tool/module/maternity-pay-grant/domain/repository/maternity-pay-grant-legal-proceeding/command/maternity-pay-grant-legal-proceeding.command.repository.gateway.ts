import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity';

export abstract class MaternityPayGrantLegalProceedingCommandRepositoryGateway {
  public abstract createMaternityPayGrantLegalProceeding(
    props: MaternityPayGrantLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType;
}
