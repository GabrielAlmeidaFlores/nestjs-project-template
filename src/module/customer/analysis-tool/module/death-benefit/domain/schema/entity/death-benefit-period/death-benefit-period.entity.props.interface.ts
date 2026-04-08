import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-category.enum';
import type { DeathBenefitPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-consideration.enum';
import type { DeathBenefitPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-pendency-reason.enum';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

export interface DeathBenefitPeriodEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitPeriodId> {
  startDate: Date;
  endDate?: Date | null;
  category: DeathBenefitCategoryEnum;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  pendencyReason?: DeathBenefitPeriodPendencyReasonEnum | null;
  typeOfContribution?: string | null;
  status: boolean;
  periodConsideration?: DeathBenefitPeriodConsiderationEnum | null;
  bondOrigin?: string | null;
  contributionAverage?: DecimalValue | null;
  deathBenefitId: DeathBenefitId;
}
