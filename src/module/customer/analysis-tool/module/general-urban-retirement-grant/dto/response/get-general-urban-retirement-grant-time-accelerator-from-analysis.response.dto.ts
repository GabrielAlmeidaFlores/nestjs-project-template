import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public timeType?: string;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoDateProperty({ required: false })
  public periodStart?: Date;

  @ResponseDtoDateProperty({ required: false })
  public periodEnd?: Date;

  @ResponseDtoStringProperty({ required: false })
  public viability?: string;

  @ResponseDtoStringProperty({ required: false })
  public recognitionINSS?: string;

  @ResponseDtoStringProperty({ required: false })
  public impactoCarencia?: string;

  @ResponseDtoStringProperty({ required: false })
  public reconhecimentoJudicial?: string;

  @ResponseDtoStringProperty({ required: false })
  public timeGained?: string;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantTimeAcceleratorFromAnalysisResponseDto.name;
}
