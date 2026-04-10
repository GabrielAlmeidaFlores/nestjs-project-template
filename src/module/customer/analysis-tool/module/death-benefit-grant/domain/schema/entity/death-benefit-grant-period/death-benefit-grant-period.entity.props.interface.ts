import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import type { DeathBenefitGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-consideration.enum';
import type { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

export interface DeathBenefitGrantPeriodEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantPeriodId> {
  startDate: Date;
  endDate?: Date | null;
  category: DeathBenefitGrantCategoryEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: DeathBenefitGrantPeriodPendencyReasonEnum | null;
  typeOfContribution?: string | null;
  status: boolean;
  periodConsideration?: DeathBenefitGrantPeriodConsiderationEnum | null;
  bondOrigin?: string | null;
  contributionAverage?: DecimalValue | null;
  deathBenefitGrantId: DeathBenefitGrantId;
}
