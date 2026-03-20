import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { GeneralUrbanRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/value-object/general-urban-retirement-grant-legal-proceeding-id.value-object';

export interface GeneralUrbanRetirementGrantLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantLegalProceedingId> {
  legalProceedingNumber: string;
  generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity;
}
