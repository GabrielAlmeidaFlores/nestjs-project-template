import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/value-object/temporary-disability-benefits-terminated-insured-status-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/enum/temporary-disability-benefits-terminated-insured-status-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status-document/value-object/temporary-disability-benefits-terminated-insured-status-document-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentTypeEnum;
  temporaryDisabilityBenefitsTerminatedInsuredStatusId: TemporaryDisabilityBenefitsTerminatedInsuredStatusId;
}
