import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePerCapitaIncomeForBpcAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public readonly completeAnalysis: string | null;

  @ResponseDtoStringProperty({ required: false })
  public readonly simplifiedAnalysis: string | null;

  protected override readonly _type =
    CreatePerCapitaIncomeForBpcAnalysisResultResponseDto.name;
}
