import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CidTenItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CidTenId)
  public id: CidTenId;

  @ResponseDtoStringProperty()
  public code: string;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type = CidTenItemResponseDto.name;
}

@ResponseDto()
export class ListCidTenResponseDto extends ListDataResponseDto<CidTenItemResponseDto> {
  @ResponseDtoObjectProperty(() => CidTenItemResponseDto, {
    isArray: true,
  })
  public override resource: CidTenItemResponseDto[];

  protected override readonly _type = ListCidTenResponseDto.name;
}
