import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/maternity-pay-grant-document.entity';

export abstract class MaternityPayGrantDocumentCommandRepositoryGateway {
  public abstract createMaternityPayGrantDocument(
    props: MaternityPayGrantDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType;
}
