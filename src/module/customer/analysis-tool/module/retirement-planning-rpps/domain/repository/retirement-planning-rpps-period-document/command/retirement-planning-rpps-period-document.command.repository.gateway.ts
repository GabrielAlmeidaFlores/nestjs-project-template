import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity';
import type { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';

export abstract class RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsPeriodDocument(
    props: RetirementPlanningRppsPeriodDocumentEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRppsPeriodDocument(
    id: RetirementPlanningRppsPeriodDocumentId,
    props: RetirementPlanningRppsPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRppsPeriodDocument(
    id: RetirementPlanningRppsPeriodDocumentId,
  ): TransactionType;
}
