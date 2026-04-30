import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';

import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/temporary-incapacity-benefit-termination-insured-status.entity.props.interface';

export class TemporaryIncapacityBenefitTerminationInsuredStatusEntity extends BaseEntity<TemporaryIncapacityBenefitTerminationInsuredStatusId> {
  public readonly involuntaryUnemployment: boolean;
  public readonly intentionToProveInvoluntaryUnemployment: boolean;
  public readonly ruralInsuredClient: boolean;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly documentsDescription: string | null;
  public readonly temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;

  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitTerminationInsuredStatusEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitTerminationInsuredStatusId, props);
    this.involuntaryUnemployment = props.involuntaryUnemployment;
    this.intentionToProveInvoluntaryUnemployment =
      props.intentionToProveInvoluntaryUnemployment;
    this.ruralInsuredClient = props.ruralInsuredClient;
    this.ruralPeriodStartDate = props.ruralPeriodStartDate ?? null;
    this.ruralPeriodEndDate = props.ruralPeriodEndDate ?? null;
    this.documentsDescription = props.documentsDescription ?? null;
    this.temporaryIncapacityBenefitTerminationId =
      props.temporaryIncapacityBenefitTerminationId;
  }
}
