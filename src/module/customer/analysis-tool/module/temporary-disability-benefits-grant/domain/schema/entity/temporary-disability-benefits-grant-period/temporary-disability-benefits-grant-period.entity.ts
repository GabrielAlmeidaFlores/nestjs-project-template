import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';

import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/enum/temporary-disability-benefits-grant-severe-disease.enum';
import type { TemporaryDisabilityBenefitsGrantPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.entity.props.interface';

export class TemporaryDisabilityBenefitsGrantPeriodEntity extends BaseEntity<TemporaryDisabilityBenefitsGrantPeriodId> {
  public readonly startDate: Date;
  public readonly cidTenId: string | null;
  public readonly description: string | null;
  public readonly jobDerivatedDisability: boolean;
  public readonly disablingConditionDescription: string | null;
  public readonly disabilityFromSevereDisease: boolean;
  public readonly severeDisease: TemporaryDisabilityBenefitsGrantSevereDiseaseEnum | null;
  public readonly diseaseStartDate: Date | null;
  public readonly needsConstantAssistanceFromAnotherPerson: boolean;
  public readonly temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  protected readonly _type = TemporaryDisabilityBenefitsGrantPeriodEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsGrantPeriodEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsGrantPeriodId, props);
    this.startDate = props.startDate;
    this.cidTenId = props.cidTenId ?? null;
    this.description = props.description ?? null;
    this.jobDerivatedDisability = props.jobDerivatedDisability;
    this.disablingConditionDescription =
      props.disablingConditionDescription ?? null;
    this.disabilityFromSevereDisease = props.disabilityFromSevereDisease;
    this.severeDisease = props.severeDisease ?? null;
    this.diseaseStartDate = props.diseaseStartDate ?? null;
    this.needsConstantAssistanceFromAnotherPerson =
      props.needsConstantAssistanceFromAnotherPerson;
    this.temporaryDisabilityBenefitsGrantId =
      props.temporaryDisabilityBenefitsGrantId;
  }
}
