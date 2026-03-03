import { LegalPleadingItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/legal-pleading-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListCurrentYearLegalPleadingsResponseDto extends ListDataResponseDto<LegalPleadingItemResponseDto> {
  @ResponseDtoObjectProperty(() => LegalPleadingItemResponseDto, {
    isArray: true,
  })
  public override resource: LegalPleadingItemResponseDto[];

  protected override readonly _type =
    ListCurrentYearLegalPleadingsResponseDto.name;
}
