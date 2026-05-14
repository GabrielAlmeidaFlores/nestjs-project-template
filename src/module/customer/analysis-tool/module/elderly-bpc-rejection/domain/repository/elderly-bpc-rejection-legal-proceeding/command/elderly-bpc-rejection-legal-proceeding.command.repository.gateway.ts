import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/elderly-bpc-rejection-legal-proceeding.entity';

export abstract class ElderlyBpcRejectionLegalProceedingCommandRepositoryGateway {
  public abstract createElderlyBpcRejectionLegalProceeding(
    props: ElderlyBpcRejectionLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteElderlyBpcRejectionLegalProceedingsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType;
}
