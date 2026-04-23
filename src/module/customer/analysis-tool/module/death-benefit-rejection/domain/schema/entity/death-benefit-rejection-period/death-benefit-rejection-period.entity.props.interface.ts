import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import type { DeathBenefitRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-consideration.enum';
import type { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

export interface DeathBenefitRejectionPeriodEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionPeriodId> {
  startDate: Date;
  endDate?: Date | null;
  category: DeathBenefitRejectionCategoryEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: DeathBenefitRejectionPeriodPendencyReasonEnum | null;
  typeOfContribution?: string | null;
  status: boolean;
  periodConsideration?: DeathBenefitRejectionPeriodConsiderationEnum | null;
  bondOrigin?: string | null;
  contributionAverage?: DecimalValue | null;
  impact?: string | null;
  gracePeriod?: number | null;
  complementViaMyInss?: boolean | null;
  deathBenefitRejectionId: DeathBenefitRejectionId;
}
