import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.entity';

export abstract class DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantDisabilityPeriodDocument(
    props: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningGrantDisabilityPeriodId(
    disabilityRetirementPlanningGrantDisabilityPeriodId: DisabilityRetirementPlanningGrantDisabilityPeriodId,
  ): TransactionType;
}
