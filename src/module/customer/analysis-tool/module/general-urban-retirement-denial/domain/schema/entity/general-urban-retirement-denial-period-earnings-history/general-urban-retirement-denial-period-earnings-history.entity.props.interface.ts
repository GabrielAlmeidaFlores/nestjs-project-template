import type { GeneralUrbanRetirementDenialPeriodEarningsHistoryId } from './value-object/general-urban-retirement-denial-period-earnings-history-id/general-urban-retirement-denial-period-earnings-history-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodId } from '../general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface GeneralUrbanRetirementDenialPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialPeriodEarningsHistoryId> {
  competence?: Date | null;
  value?: string | null;
  generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId;
}
