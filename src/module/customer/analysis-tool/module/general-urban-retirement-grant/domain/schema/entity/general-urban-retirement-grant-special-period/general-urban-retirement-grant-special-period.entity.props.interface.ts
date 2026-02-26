import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';

export interface GeneralUrbanRetirementGrantSpecialPeriodEntityPropsInterface
  extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantSpecialPeriodId> {
  response: string;
  generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantEntity | null;
}
