import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/special-retirement-grant-period-document.entity';
import type { SpecialRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-document/value-object/special-retirement-grant-period-document-id/special-retirement-grant-period-document-id.value-object';

export abstract class SpecialRetirementGrantPeriodDocumentCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantPeriodDocument(
    props: SpecialRetirementGrantPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteSpecialRetirementGrantPeriodDocument(
    id: SpecialRetirementGrantPeriodDocumentId,
  ): TransactionType;
}
