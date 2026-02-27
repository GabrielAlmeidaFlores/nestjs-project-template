import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import { DisabilityRetirementPlanningPeriodDisabilityDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/value-object/disability-retirement-planning-period-disability-document-id.value-object';

export abstract class DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningPeriodDisabilityDocument(
    props: DisabilityRetirementPlanningPeriodDisabilityDocumentEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningPeriodDisabilityDocument(
    id: DisabilityRetirementPlanningPeriodDisabilityDocumentId,
  ): TransactionType;
}
