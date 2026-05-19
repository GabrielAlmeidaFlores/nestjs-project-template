import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity';

export abstract class DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantDocument(
    props: DisabilityRetirementPlanningGrantDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningGrantId(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): TransactionType;
}
