import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/enum/temporary-disability-benefits-grant-document-type.enum';
import type { TemporaryDisabilityBenefitsGrantDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-document/value-object/temporary-disability-benefits-grant-document-id.value-object';

export interface TemporaryDisabilityBenefitsGrantDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsGrantDocumentTypeEnum;
  temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
}
