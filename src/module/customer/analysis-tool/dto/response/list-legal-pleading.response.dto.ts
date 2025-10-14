import { GetLegalPleadingResponseDto } from '@module/customer/analysis-tool/dto/response/get-legal-pleading.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListLegalPleadingResponseDto extends ListDataResponseDto<GetLegalPleadingResponseDto> {
  @ResponseDtoObjectProperty(() => GetLegalPleadingResponseDto, {
    isArray: true,
  })
  public override resource: GetLegalPleadingResponseDto[];

  protected override readonly _type = ListLegalPleadingResponseDto.name;
}
