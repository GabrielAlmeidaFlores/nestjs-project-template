import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.entity';

export abstract class DisabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejectionPeriodDocument(
    props: DisabilityRetirementPlanningRejectionPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningRejectionPeriodId(
    disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId,
  ): TransactionType;
}
