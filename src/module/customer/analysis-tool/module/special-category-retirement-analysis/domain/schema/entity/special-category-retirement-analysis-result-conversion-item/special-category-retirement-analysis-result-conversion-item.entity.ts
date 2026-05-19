import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SpecialCategoryRetirementAnalysisResultConversionItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/value-object/special-category-retirement-analysis-result-conversion-item-id/special-category-retirement-analysis-result-conversion-item-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import type { RecognitionStatusEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/enum/recognition-status.enum';
import type { SpecialCategoryRetirementAnalysisResultConversionItemEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-conversion-item/special-category-retirement-analysis-result-conversion-item.entity.props.interface';

export class SpecialCategoryRetirementAnalysisResultConversionItemEntity extends BaseEntity<SpecialCategoryRetirementAnalysisResultConversionItemId> {
  public readonly specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;
  public readonly originJobTitleDescription: string;
  public readonly periodDateRangeText: string;
  public readonly harmfulExposureAgentsText: string;
  public readonly specialTimeDurationText: string;
  public readonly convertedTimeDurationText: string;
  public readonly conversionFactorValue: DecimalValue;
  public readonly recognitionStatusEnum: RecognitionStatusEnum;

  protected readonly _type =
    SpecialCategoryRetirementAnalysisResultConversionItemEntity.name;

  public constructor(
    props: SpecialCategoryRetirementAnalysisResultConversionItemEntityPropsInterface,
  ) {
    super(SpecialCategoryRetirementAnalysisResultConversionItemId, props);
    this.specialCategoryRetirementAnalysisResultId =
      props.specialCategoryRetirementAnalysisResultId;
    this.originJobTitleDescription = props.originJobTitleDescription;
    this.periodDateRangeText = props.periodDateRangeText;
    this.harmfulExposureAgentsText = props.harmfulExposureAgentsText;
    this.specialTimeDurationText = props.specialTimeDurationText;
    this.convertedTimeDurationText = props.convertedTimeDurationText;
    this.conversionFactorValue = props.conversionFactorValue;
    this.recognitionStatusEnum = props.recognitionStatusEnum;
  }
}
