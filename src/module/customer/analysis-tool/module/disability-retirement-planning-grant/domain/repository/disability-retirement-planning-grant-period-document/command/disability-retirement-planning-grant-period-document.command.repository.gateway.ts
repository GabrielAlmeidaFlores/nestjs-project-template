import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import type { DisabilityRetirementPlanningGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.entity';

export abstract class DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantPeriodDocument(
    props: DisabilityRetirementPlanningGrantPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningGrantPeriodId(
    disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId,
  ): TransactionType;
}
