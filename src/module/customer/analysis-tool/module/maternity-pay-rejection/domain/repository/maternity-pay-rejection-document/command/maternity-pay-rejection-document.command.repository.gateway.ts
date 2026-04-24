import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity';

export abstract class MaternityPayRejectionDocumentCommandRepositoryGateway {
  public abstract createMaternityPayRejectionDocument(
    props: MaternityPayRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllMaternityPayRejectionDocumentByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType;
}
