import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';
import type { ElderlyBpcRejectionFamiliarGroupDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/elderly-bpc-rejection-familiar-group-document.entity';

export abstract class ElderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway {
  public abstract createElderlyBpcRejectionFamiliarGroupDocument(
    props: ElderlyBpcRejectionFamiliarGroupDocumentEntity,
  ): TransactionType;

  public abstract deleteElderlyBpcRejectionFamiliarGroupDocumentsByFamiliarGroupId(
    elderlyBpcRejectionFamiliarGroupId: ElderlyBpcRejectionFamiliarGroupId,
  ): TransactionType;
}
