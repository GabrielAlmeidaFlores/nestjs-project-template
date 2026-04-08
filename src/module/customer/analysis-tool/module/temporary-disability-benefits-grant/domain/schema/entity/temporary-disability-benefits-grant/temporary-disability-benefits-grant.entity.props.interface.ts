import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

export interface TemporaryDisabilityBenefitsGrantEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantId> {
  category: TemporaryDisabilityBenefitsGrantCategoryEnum;
  analysisName?: string | null;
  temporaryDisabilityBenefitsGrantResultId?: TemporaryDisabilityBenefitsGrantResultId | null;
}
