import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';

import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/temporary-incapacity-benefit-rejection-insured-status.entity.props.interface';

export class TemporaryIncapacityBenefitRejectionInsuredStatusEntity extends BaseEntity<TemporaryIncapacityBenefitRejectionInsuredStatusId> {
  public readonly involuntaryUnemployment: boolean;
  public readonly intentionToProveInvoluntaryUnemployment: boolean;
  public readonly ruralInsuredClient: boolean;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly documentsDescription: string | null;
  public readonly temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;

  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusEntity.name;

  public constructor(
    props: TemporaryIncapacityBenefitRejectionInsuredStatusEntityPropsInterface,
  ) {
    super(TemporaryIncapacityBenefitRejectionInsuredStatusId, props);
    this.involuntaryUnemployment = props.involuntaryUnemployment;
    this.intentionToProveInvoluntaryUnemployment =
      props.intentionToProveInvoluntaryUnemployment;
    this.ruralInsuredClient = props.ruralInsuredClient;
    this.ruralPeriodStartDate = props.ruralPeriodStartDate ?? null;
    this.ruralPeriodEndDate = props.ruralPeriodEndDate ?? null;
    this.documentsDescription = props.documentsDescription ?? null;
    this.temporaryIncapacityBenefitRejectionId =
      props.temporaryIncapacityBenefitRejectionId;
  }
}
