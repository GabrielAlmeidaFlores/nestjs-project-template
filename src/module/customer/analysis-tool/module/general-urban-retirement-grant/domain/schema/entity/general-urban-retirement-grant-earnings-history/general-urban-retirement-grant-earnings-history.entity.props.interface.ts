import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { GeneralUrbanRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/value-object/general-urban-retirement-grant-earnings-history-id.value-object';
import type { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';

export interface GeneralUrbanRetirementGrantEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantEntity | null;
  generalUrbanRetirementGrantPeriod?: GeneralUrbanRetirementGrantPeriodEntity | null;
  competenceBelowTheMinimum?: boolean | null;
  analysis?: string | null;
}
