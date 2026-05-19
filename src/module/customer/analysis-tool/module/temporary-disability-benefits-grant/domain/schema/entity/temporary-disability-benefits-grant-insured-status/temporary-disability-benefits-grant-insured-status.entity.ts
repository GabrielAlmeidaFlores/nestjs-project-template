import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';

import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantInsuredStatusEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantInsuredStatusId> {
  public readonly involuntaryUnemployment: boolean;
  public readonly intentionToProveInvoluntaryUnemployment: boolean;
  public readonly ruralInsuredClient: boolean;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly documentsDescription: string | null;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  protected readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantInsuredStatusEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantInsuredStatusId, props);
    this.involuntaryUnemployment = props.involuntaryUnemployment;
    this.intentionToProveInvoluntaryUnemployment =
      props.intentionToProveInvoluntaryUnemployment;
    this.ruralInsuredClient = props.ruralInsuredClient;
    this.ruralPeriodStartDate = props.ruralPeriodStartDate ?? null;
    this.ruralPeriodEndDate = props.ruralPeriodEndDate ?? null;
    this.documentsDescription = props.documentsDescription ?? null;
    this.temporaryDisabilityBenefitsGrantId =
      props.temporaryDisabilityBenefitsGrantId;
  }
}
