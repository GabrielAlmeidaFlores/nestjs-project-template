import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/enum/temporary-disability-benefits-terminated-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-document/value-object/temporary-disability-benefits-terminated-document-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsTerminatedDocumentTypeEnum;
  temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;
}
