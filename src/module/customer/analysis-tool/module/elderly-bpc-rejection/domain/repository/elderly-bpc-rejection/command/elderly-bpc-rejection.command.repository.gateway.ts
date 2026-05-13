import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';

export abstract class ElderlyBpcRejectionCommandRepositoryGateway {
  public abstract createElderlyBpcRejection(
    props: ElderlyBpcRejectionEntity,
  ): TransactionType;

  public abstract updateElderlyBpcRejection(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    props: ElderlyBpcRejectionEntity,
  ): TransactionType;

  public abstract updateElderlyBpcRejectionResultId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
    elderlyBpcRejectionResultId: ElderlyBpcRejectionResultId,
  ): TransactionType;

  public abstract deleteElderlyBpcRejection(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType;
}
