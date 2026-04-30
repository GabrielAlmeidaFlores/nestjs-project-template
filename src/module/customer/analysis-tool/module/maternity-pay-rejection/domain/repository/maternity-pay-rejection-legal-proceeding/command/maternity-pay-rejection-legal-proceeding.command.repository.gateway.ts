import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.entity';

export abstract class MaternityPayRejectionLegalProceedingCommandRepositoryGateway {
  public abstract createMaternityPayRejectionLegalProceeding(
    props: MaternityPayRejectionLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAllMaternityPayRejectionLegalProceedingByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType;
}
