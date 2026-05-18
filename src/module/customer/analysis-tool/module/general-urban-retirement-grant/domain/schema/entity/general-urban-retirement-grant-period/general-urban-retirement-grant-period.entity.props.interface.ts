import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/enum/reason-pendency.enum';
import type { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';

export interface GeneralUrbanRetirementGrantPeriodEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementGrantPeriodId> {
  periodName?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  category?: string | null;
  isPendency?: boolean | null;
  competenceBelowTheMinimum?: boolean | null;
  contributionAverage?: DecimalValue | null;
  typeOfContribution?: string | null;
  generalUrbanRetirementGrant?: GeneralUrbanRetirementGrantEntity | null;
  status?: boolean | null;
  reasonPendency?: ReasonPendencyEnum | null;
}
