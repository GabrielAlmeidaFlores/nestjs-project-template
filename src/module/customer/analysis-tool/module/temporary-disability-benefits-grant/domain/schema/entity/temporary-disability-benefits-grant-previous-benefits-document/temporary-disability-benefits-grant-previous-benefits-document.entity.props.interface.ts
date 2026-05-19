import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits/value-object/temporary-disability-benefits-grant-previous-benefits-id.value-object';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/enum/temporary-disability-benefits-grant-previous-benefits-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-previous-benefits-document/value-object/temporary-disability-benefits-grant-previous-benefits-document-id.value-object';

export interface TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentTypeEnum;
  temporaryDisabilityBenefitsGrantPreviousBenefitsId: TemporaryDisabilityBenefitsGrantPreviousBenefitsId;
}
