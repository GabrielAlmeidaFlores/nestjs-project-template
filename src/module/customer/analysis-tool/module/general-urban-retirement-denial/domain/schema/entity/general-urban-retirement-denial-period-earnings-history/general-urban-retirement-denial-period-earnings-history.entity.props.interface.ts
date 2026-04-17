import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/value-object/general-urban-retirement-denial-period-earnings-history-id/general-urban-retirement-denial-period-earnings-history-id.value-object';

export interface GeneralUrbanRetirementDenialPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialPeriodEarningsHistoryId> {
  competence?: Date | null;
  value?: string | null;
  generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId;
}
