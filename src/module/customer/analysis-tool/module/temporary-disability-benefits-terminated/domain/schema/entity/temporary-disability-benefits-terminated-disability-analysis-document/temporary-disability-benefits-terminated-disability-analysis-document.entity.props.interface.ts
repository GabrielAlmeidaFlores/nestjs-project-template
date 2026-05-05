import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/enum/temporary-disability-benefits-terminated-disability-analysis-document-type.enum';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/value-object/temporary-disability-benefits-terminated-disability-analysis-document-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentId> {
  fileName: string;
  type: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum;
  temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId;
}
