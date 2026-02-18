import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateRuralTimelineAnalysisPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty({
    description:
      'Indica se a atualização do período de atividade rural foi realizada com sucesso.',
  })
  public success: boolean;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodResponseDto.name;
}
