import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';

import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusEntityPropsInterface } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/permanent-incapacity-benefit-terminated-insured-status.entity.props.interface';

export class PermanentIncapacityBenefitTerminatedInsuredStatusEntity extends BaseEntity<PermanentIncapacityBenefitTerminatedInsuredStatusId> {
  public readonly involuntaryUnemployment: boolean;
  public readonly intentionToProveInvoluntaryUnemployment: boolean;
  public readonly ruralInsuredClient: boolean;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly documentsDescription: string | null;
  public readonly permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;

  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusEntity.name;

  public constructor(
    props: PermanentIncapacityBenefitTerminatedInsuredStatusEntityPropsInterface,
  ) {
    super(PermanentIncapacityBenefitTerminatedInsuredStatusId, props);
    this.involuntaryUnemployment = props.involuntaryUnemployment;
    this.intentionToProveInvoluntaryUnemployment =
      props.intentionToProveInvoluntaryUnemployment;
    this.ruralInsuredClient = props.ruralInsuredClient;
    this.ruralPeriodStartDate = props.ruralPeriodStartDate ?? null;
    this.ruralPeriodEndDate = props.ruralPeriodEndDate ?? null;
    this.documentsDescription = props.documentsDescription ?? null;
    this.permanentIncapacityBenefitTerminatedId =
      props.permanentIncapacityBenefitTerminatedId;
  }
}
