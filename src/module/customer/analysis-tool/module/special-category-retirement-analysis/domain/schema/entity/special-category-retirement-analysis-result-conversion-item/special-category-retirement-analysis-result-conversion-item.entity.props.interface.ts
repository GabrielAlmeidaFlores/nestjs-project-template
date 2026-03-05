import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import type { RecognitionStatusEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/enum/recognition-status.enum';
import type { SpecialCategoryRetirementAnalysisResultConversionItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/value-object/special-category-retirement-analysis-result-conversion-item-id/special-category-retirement-analysis-result-conversion-item-id.value-object';

export interface SpecialCategoryRetirementAnalysisResultConversionItemEntityPropsInterface extends BaseEntityPropsInterface<SpecialCategoryRetirementAnalysisResultConversionItemId> {
  specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;
  originJobTitleDescription: string;
  periodDateRangeText: string;
  harmfulExposureAgentsText: string;
  specialTimeDurationText: string;
  convertedTimeDurationText: string;
  conversionFactorValue: DecimalValue;
  recognitionStatusEnum: RecognitionStatusEnum;
}
