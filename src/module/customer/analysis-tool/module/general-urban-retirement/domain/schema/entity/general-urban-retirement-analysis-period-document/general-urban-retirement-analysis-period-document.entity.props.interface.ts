import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/general-urban-retirement-analysis-period-disability.entity';
import type { GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/enum/general-urban-retirement-analysis-period-document-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/general-urban-retirement-analysis-period-special-time.entity';

export interface GeneralUrbanRetirementAnalysisPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisPeriodDocumentId> {
  document: string;
  documentType: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum;
  generalUrbanRetirementAnalysisPeriodSpecialTime?: GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity | null;
  generalUrbanRetirementAnalysisPeriodDisability?: GeneralUrbanRetirementAnalysisPeriodDisabilityEntity | null;
  generalUrbanRetirementAnalysis?: GeneralUrbanRetirementAnalysisEntity | null;
}
