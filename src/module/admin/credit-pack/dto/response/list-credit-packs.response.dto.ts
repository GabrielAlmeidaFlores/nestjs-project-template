import { GetCreditPackResponseDto } from '@module/admin/credit-pack/dto/response/get-credit-pack.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListCreditPacksResponseDto extends ListDataResponseDto<GetCreditPackResponseDto> {
  @ResponseDtoObjectProperty(() => GetCreditPackResponseDto, { isArray: true })
  public override resource: GetCreditPackResponseDto[];

  protected override readonly _type = ListCreditPacksResponseDto.name;
}
