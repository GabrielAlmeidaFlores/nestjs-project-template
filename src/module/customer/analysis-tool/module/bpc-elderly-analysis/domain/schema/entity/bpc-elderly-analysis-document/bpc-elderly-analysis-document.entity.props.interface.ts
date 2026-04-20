import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyAnalysisEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/bpc-elderly-analysis.entity';
import type { BpcElderlyAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/enum/bpc-elderly-analysis-document-type.enum';
import type { BpcElderlyAnalysisDocumentId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-document/value-object/bpc-elderly-analysis-document-id/bpc-elderly-analysis-document-id.value-object';

export interface BpcElderlyAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyAnalysisDocumentId> {
  document: string;
  type: BpcElderlyAnalysisDocumentTypeEnum;
  bpcElderlyAnalysis: BpcElderlyAnalysisEntity;
}
