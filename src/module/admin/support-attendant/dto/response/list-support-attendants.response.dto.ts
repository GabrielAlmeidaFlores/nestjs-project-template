import { GetSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/get-support-attendant.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListSupportAttendantsResponseDto extends ListDataResponseDto<GetSupportAttendantResponseDto> {
  @ResponseDtoObjectProperty(() => GetSupportAttendantResponseDto, {
    isArray: true,
  })
  public override resource: GetSupportAttendantResponseDto[];

  protected override readonly _type = ListSupportAttendantsResponseDto.name;
}
