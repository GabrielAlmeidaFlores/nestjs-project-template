import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';
import type { RetirementPermanentDisabilityRevisionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/enum/retirement-permanent-disability-revision-category.enum';

export interface RetirementPermanentDisabilityRevisionEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionId> {
  analysisName?: string | null;
  category?: RetirementPermanentDisabilityRevisionCategoryEnum | null;
  myInssPassword?: string | null;
  retirementPermanentDisabilityRevisionResultId?: RetirementPermanentDisabilityRevisionResultId | null;
}
