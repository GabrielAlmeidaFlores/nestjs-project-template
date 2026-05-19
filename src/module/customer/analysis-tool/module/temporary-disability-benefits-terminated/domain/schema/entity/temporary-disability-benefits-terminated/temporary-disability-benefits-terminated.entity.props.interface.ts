import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/enum/temporary-disability-benefits-terminated-category.enum';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  benefitCessationDate?: Date | null;
  category?: TemporaryDisabilityBenefitsTerminatedCategoryEnum | null;
  myInssPassword?: string | null;
  benefitCessationReason?: string | null;
  temporaryDisabilityBenefitsTerminatedResultId?: TemporaryDisabilityBenefitsTerminatedResultId | null;
}
