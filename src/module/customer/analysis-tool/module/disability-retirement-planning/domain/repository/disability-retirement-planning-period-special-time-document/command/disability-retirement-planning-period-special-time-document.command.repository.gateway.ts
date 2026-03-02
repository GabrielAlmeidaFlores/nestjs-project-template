import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document.entity';
import type { DisabilityRetirementPlanningPeriodSpecialTimeDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/value-object/disability-retirement-planning-period-special-time-document-id.value-object';

export abstract class DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningPeriodSpecialTimeDocument(
    props: DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningPeriodSpecialTimeDocument(
    id: DisabilityRetirementPlanningPeriodSpecialTimeDocumentId,
  ): TransactionType;
}
