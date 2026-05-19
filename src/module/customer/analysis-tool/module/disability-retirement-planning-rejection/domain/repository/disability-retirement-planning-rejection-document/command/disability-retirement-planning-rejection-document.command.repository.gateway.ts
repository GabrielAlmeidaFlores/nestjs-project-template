import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity';

export abstract class DisabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejectionDocument(
    props: DisabilityRetirementPlanningRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningRejectionId(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): TransactionType;
}
