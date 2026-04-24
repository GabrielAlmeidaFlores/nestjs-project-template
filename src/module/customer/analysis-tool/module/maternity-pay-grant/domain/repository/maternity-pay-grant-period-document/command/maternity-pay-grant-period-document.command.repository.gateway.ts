import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import type { MaternityPayGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/maternity-pay-grant-period-document.entity';

export abstract class MaternityPayGrantPeriodDocumentCommandRepositoryGateway {
  public abstract createMaternityPayGrantPeriodDocument(
    props: MaternityPayGrantPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByMaternityPayGrantPeriodId(
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
  ): TransactionType;
}
