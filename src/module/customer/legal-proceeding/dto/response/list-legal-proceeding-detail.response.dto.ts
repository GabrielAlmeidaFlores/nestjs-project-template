import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListLegalProceedingDetailResponseDto extends ListDataResponseDto<object> {
  @ResponseDtoObjectProperty(() => Object, {
    isArray: true,
  })
  public override resource: object[];

  protected override readonly _type = ListLegalProceedingDetailResponseDto.name;
}
