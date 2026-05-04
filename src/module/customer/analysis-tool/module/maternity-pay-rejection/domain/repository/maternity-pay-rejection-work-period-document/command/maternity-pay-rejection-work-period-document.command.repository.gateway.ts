import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import type { MaternityPayRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity';

export abstract class MaternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway {
  public abstract createMaternityPayRejectionWorkPeriodDocument(
    props: MaternityPayRejectionWorkPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllMaternityPayRejectionWorkPeriodDocumentByMaternityPayRejectionWorkPeriodId(
    id: MaternityPayRejectionWorkPeriodId,
  ): TransactionType;
}
