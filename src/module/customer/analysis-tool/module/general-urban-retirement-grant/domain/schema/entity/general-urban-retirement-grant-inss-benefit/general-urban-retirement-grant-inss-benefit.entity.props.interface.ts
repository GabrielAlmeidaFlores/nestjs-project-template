import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { GeneralUrbanRetirementGrantInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/value-object/general-urban-retirement-grant-inss-benefit-id.value-object';

export interface GeneralUrbanRetirementGrantInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantInssBenefitId> {
  inssBenefitNumber: string;
  generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity;
}
