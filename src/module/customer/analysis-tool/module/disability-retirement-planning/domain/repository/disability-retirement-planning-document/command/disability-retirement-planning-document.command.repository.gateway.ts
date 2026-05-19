import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/disability-retirement-planning-document.entity';
import type { DisabilityRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/value-object/disability-retirement-planning-document-id.value-object';

export abstract class DisabilityRetirementPlanningDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningDocument(
    props: DisabilityRetirementPlanningDocumentEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningDocument(
    id: DisabilityRetirementPlanningDocumentId,
  ): TransactionType;
}
