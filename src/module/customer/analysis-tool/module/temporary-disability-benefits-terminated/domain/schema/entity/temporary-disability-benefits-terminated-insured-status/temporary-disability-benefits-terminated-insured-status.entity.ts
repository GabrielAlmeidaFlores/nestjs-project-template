import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/temporary-disability-benefits-terminated-insured-status.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedInsuredStatusId> {
  public readonly involuntaryUnemployment: boolean;
  public readonly intentionToProveInvoluntaryUnemployment: boolean;
  public readonly ruralInsuredClient: boolean;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly documentsDescription: string | null;
  public readonly temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedInsuredStatusEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedInsuredStatusId, props);
    this.involuntaryUnemployment = props.involuntaryUnemployment;
    this.intentionToProveInvoluntaryUnemployment =
      props.intentionToProveInvoluntaryUnemployment;
    this.ruralInsuredClient = props.ruralInsuredClient;
    this.ruralPeriodStartDate = props.ruralPeriodStartDate ?? null;
    this.ruralPeriodEndDate = props.ruralPeriodEndDate ?? null;
    this.documentsDescription = props.documentsDescription ?? null;
    this.temporaryDisabilityBenefitsTerminatedId =
      props.temporaryDisabilityBenefitsTerminatedId;
  }
}
