import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';

import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/enum/temporary-disability-benefits-terminated-severe-disease.enum';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/temporary-disability-benefits-terminated-disability-analysis.entity.props.interface';

export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity extends BaseEntity<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId> {
  public readonly estimatedDisabilityStartDate: Date;
  public readonly shortDisabilityDescription: string | null;
  public readonly disabilityFromAccident: boolean;
  public readonly disablingConditionDescription: string | null;
  public readonly disabilityFromSevereDisease: boolean;
  public readonly severeDisease: TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum | null;
  public readonly diseaseCustomName: string | null;
  public readonly diseaseStartDate: Date | null;
  public readonly needsConstantAssistanceFromAnotherPerson: boolean;
  public readonly previousDisabilityBenefit: boolean;
  public readonly temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;

  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntity.name;

  public constructor(
    props: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntityPropsInterface,
  ) {
    super(TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId, props);
    this.estimatedDisabilityStartDate = props.estimatedDisabilityStartDate;
    this.shortDisabilityDescription = props.shortDisabilityDescription ?? null;
    this.disabilityFromAccident = props.disabilityFromAccident;
    this.disablingConditionDescription =
      props.disablingConditionDescription ?? null;
    this.disabilityFromSevereDisease = props.disabilityFromSevereDisease;
    this.severeDisease = props.severeDisease ?? null;
    this.diseaseCustomName = props.diseaseCustomName ?? null;
    this.diseaseStartDate = props.diseaseStartDate ?? null;
    this.needsConstantAssistanceFromAnotherPerson =
      props.needsConstantAssistanceFromAnotherPerson;
    this.previousDisabilityBenefit = props.previousDisabilityBenefit;
    this.temporaryDisabilityBenefitsTerminatedId =
      props.temporaryDisabilityBenefitsTerminatedId;
  }
}
