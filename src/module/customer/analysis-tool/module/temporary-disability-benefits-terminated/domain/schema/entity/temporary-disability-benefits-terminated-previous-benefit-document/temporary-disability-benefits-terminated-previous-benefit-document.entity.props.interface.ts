import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit/value-object/temporary-disability-benefits-terminated-previous-benefit-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/enum/temporary-disability-benefits-terminated-previous-benefit-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/value-object/temporary-disability-benefits-terminated-previous-benefit-document-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeEnum;
  temporaryDisabilityBenefitsTerminatedPreviousBenefitId: TemporaryDisabilityBenefitsTerminatedPreviousBenefitId;
}
