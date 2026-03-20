import { GetTutorialItemResponseDto } from '@module/customer/tutorial/dto/response/get-tutorial-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListTutorialsResponseDto extends ListDataResponseDto<GetTutorialItemResponseDto> {
  @ResponseDtoObjectProperty(() => GetTutorialItemResponseDto, {
    isArray: true,
  })
  public override resource: GetTutorialItemResponseDto[];

  protected override readonly _type = ListTutorialsResponseDto.name;
}
