import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import type { SpecialRetirementGrantPeriodObservationEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/special-retirement-grant-period-observation.entity';
import type { SpecialRetirementGrantPeriodObservationId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/value-object/special-retirement-grant-period-observation-id/special-retirement-grant-period-observation-id.value-object';

export abstract class SpecialRetirementGrantPeriodObservationCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantPeriodObservation(
    props: SpecialRetirementGrantPeriodObservationEntity,
  ): TransactionType;

  public abstract updateSpecialRetirementGrantPeriodObservation(
    id: SpecialRetirementGrantPeriodObservationId,
    props: SpecialRetirementGrantPeriodObservationEntity,
  ): TransactionType;

  public abstract deleteSpecialRetirementGrantPeriodObservation(
    id: SpecialRetirementGrantPeriodObservationId,
  ): TransactionType;

  public abstract deleteAllBySpecialRetirementGrantPeriodId(
    specialRetirementGrantPeriodId: SpecialRetirementGrantPeriodId,
  ): TransactionType;
}
