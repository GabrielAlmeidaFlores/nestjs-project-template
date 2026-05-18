import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/special-retirement-rejection-work-period-document.entity';

export abstract class SpecialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionWorkPeriodDocument(
    props: SpecialRetirementRejectionWorkPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionWorkPeriodDocumentBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
