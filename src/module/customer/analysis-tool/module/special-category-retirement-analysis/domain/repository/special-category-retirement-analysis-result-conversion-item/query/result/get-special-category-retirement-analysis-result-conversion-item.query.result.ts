import type { RecognitionStatusEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/enum/recognition-status.enum';
import type { SpecialCategoryRetirementAnalysisResultConversionItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/value-object/special-category-retirement-analysis-result-conversion-item-id/special-category-retirement-analysis-result-conversion-item-id.value-object';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

export class GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult {
  public readonly specialCategoryRetirementAnalysisResultConversionItemId: SpecialCategoryRetirementAnalysisResultConversionItemId;
  public readonly specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;
  public readonly originJobTitleDescription: string;
  public readonly periodDateRangeText: string;
  public readonly harmfulExposureAgentsText: string;
  public readonly specialTimeDurationText: string;
  public readonly convertedTimeDurationText: string;
  public readonly conversionFactorValue: number;
  public readonly recognitionStatusEnum: RecognitionStatusEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected readonly _type = GetSpecialCategoryRetirementAnalysisResultConversionItemQueryResult.name;
}
