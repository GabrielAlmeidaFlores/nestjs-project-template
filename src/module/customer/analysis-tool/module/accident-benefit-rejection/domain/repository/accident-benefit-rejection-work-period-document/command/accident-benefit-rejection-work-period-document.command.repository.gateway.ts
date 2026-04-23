import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import type { AccidentBenefitRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity';

export abstract class AccidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionWorkPeriodDocument(
    props: AccidentBenefitRejectionWorkPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllAccidentBenefitRejectionWorkPeriodDocumentByAccidentBenefitRejectionWorkPeriodId(
    id: AccidentBenefitRejectionWorkPeriodId,
  ): TransactionType;
}
