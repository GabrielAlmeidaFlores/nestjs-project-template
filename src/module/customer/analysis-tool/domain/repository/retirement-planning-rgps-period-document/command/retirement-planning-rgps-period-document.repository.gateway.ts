import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity';
import type { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';

export abstract class RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsPeriodDocument(
    props: RetirementPlanningRgpsPeriodDocumentEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRgpsPeriodDocument(
    id: RetirementPlanningRgpsPeriodDocumentId,
    props: RetirementPlanningRgpsPeriodDocumentEntity,
  ): TransactionType;
}
