import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

export abstract class MaternityPayRejectionCommandRepositoryGateway {
  public abstract createMaternityPayRejection(
    props: MaternityPayRejectionEntity,
  ): TransactionType;

  public abstract updateMaternityPayRejection(
    id: MaternityPayRejectionId,
    props: MaternityPayRejectionEntity,
  ): TransactionType;

  public abstract updateMaternityPayRejectionResultId(
    id: MaternityPayRejectionId,
    resultId: MaternityPayRejectionResultId,
  ): TransactionType;
}
