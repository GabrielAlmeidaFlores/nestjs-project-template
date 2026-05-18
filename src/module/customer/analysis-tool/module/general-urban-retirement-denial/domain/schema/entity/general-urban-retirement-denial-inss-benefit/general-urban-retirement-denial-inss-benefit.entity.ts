import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GeneralUrbanRetirementDenialInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-inss-benefit/value-object/general-urban-retirement-denial-inss-benefit-id.value-object';

import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-inss-benefit/general-urban-retirement-denial-inss-benefit.entity.props.interface';

export class GeneralUrbanRetirementDenialInssBenefitEntity extends BaseEntity<GeneralUrbanRetirementDenialInssBenefitId> {
  public readonly inssBenefit: string;
  public readonly generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;

  protected readonly _type = GeneralUrbanRetirementDenialInssBenefitEntity.name;

  public constructor(
    props: GeneralUrbanRetirementDenialInssBenefitEntityPropsInterface,
  ) {
    super(GeneralUrbanRetirementDenialInssBenefitId, props);
    this.inssBenefit = props.inssBenefit;
    this.generalUrbanRetirementDenialId = props.generalUrbanRetirementDenialId;
  }
}
