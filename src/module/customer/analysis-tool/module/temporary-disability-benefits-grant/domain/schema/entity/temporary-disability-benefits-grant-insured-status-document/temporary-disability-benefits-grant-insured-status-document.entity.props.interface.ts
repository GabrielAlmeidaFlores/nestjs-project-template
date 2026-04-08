import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/enum/temporary-disability-benefits-grant-insured-status-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status-document/value-object/temporary-disability-benefits-grant-insured-status-document-id.value-object';

export interface TemporaryDisabilityBenefitsGrantInsuredStatusDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsGrantInsuredStatusDocumentTypeEnum;
  temporaryDisabilityBenefitsGrantInsuredStatusId: TemporaryDisabilityBenefitsGrantInsuredStatusId;
}
