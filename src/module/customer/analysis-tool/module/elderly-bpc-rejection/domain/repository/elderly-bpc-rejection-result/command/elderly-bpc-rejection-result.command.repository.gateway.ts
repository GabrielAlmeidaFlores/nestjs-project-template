import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';

export abstract class ElderlyBpcRejectionResultCommandRepositoryGateway {
  public abstract createElderlyBpcRejectionResult(
    props: ElderlyBpcRejectionResultEntity,
  ): TransactionType;

  public abstract updateElderlyBpcRejectionResult(
    props: ElderlyBpcRejectionResultEntity,
  ): TransactionType;
}
