import { BpcElderlyAnalysisCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/enum/bpc-elderly-analysis-category.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

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

  @ResponseDtoEnumProperty(BpcElderlyAnalysisCategoryEnum, { required: false })
  public readonly category?: BpcElderlyAnalysisCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public readonly bpcElderlyCompleteAnalysisResult?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly legalRequirementsMet?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly perCapitaIncomeBelowQuarterMinimumWage?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly ageEqualOrAbove65Years?: string;

  protected override readonly _type =
    CreateBpcElderlyAnalysisResultResponseDto.name;
}
