import { ListDocumentsSentByEmailItemResponseDto } from '@module/customer/documents-sent-by-email/dto/response/list-documents-sent-by-email-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListDocumentsSentByEmailResponseDto extends ListDataResponseDto<ListDocumentsSentByEmailItemResponseDto> {
  @ResponseDtoObjectProperty(() => ListDocumentsSentByEmailItemResponseDto, {
    isArray: true,
  })
  public override resource: ListDocumentsSentByEmailItemResponseDto[];

  protected override readonly _type = ListDocumentsSentByEmailResponseDto.name;
}
