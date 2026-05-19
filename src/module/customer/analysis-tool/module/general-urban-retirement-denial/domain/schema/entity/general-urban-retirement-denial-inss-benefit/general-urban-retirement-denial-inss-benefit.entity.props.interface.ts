import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-inss-benefit/value-object/general-urban-retirement-denial-inss-benefit-id.value-object';

export interface GeneralUrbanRetirementDenialInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialInssBenefitId> {
  inssBenefit: string;
  generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId;
}
