import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import type { GeneralUrbanRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/enum/general-urban-retirement-analysis-document-type.enum';
import type { GeneralUrbanRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/value-object/general-urban-retirement-analysis-document-id.value-object';

export interface GeneralUrbanRetirementAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisDocumentId> {
  type: GeneralUrbanRetirementAnalysisDocumentTypeEnum;
  document: string;
  generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId;
}
