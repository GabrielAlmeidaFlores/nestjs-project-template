import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import type { ElderlyBpcRejectionDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/elderly-bpc-rejection-document.entity';

export abstract class ElderlyBpcRejectionDocumentCommandRepositoryGateway {
  public abstract createElderlyBpcRejectionDocument(
    props: ElderlyBpcRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteElderlyBpcRejectionDocumentsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType;
}
