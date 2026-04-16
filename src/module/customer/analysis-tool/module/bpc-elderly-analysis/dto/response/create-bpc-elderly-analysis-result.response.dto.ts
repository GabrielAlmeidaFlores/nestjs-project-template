import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { BpcElderlyAnalysisResultCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/enum/bpc-elderly-analysis-result-category.enum';

@ResponseDto()
export class CreateBpcElderlyAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public readonly diagnosis?: string;

  @ResponseDtoNumberProperty({ required: false })
  public readonly totalHouseholdIncome?: number;

  @ResponseDtoNumberProperty({ required: false })
  public readonly perCapitaIncome?: number;

  @ResponseDtoStringProperty({ required: false })
  public readonly eligibilityJustification?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly type?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly benefitStartDate?: string;

  @ResponseDtoNumberProperty({ required: false })
  public readonly amount?: number;

  @ResponseDtoEnumProperty(BpcElderlyAnalysisResultCategoryEnum, { required: false })
  public readonly category?: BpcElderlyAnalysisResultCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public readonly bpcElderlyCompleteAnalysisResult?: string;

  protected override readonly _type =
    CreateBpcElderlyAnalysisResultResponseDto.name;
}
