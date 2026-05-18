import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

export interface DisabilityRetirementPlanningGrantEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantId> {
  category: DisabilityRetirementPlanningGrantCategoryEnum;
  analysisName?: string | null;
  longPrizeDisability: boolean;
  disabilityRetirementPlanningGrantResultId?: DisabilityRetirementPlanningGrantResultId | null;
}
