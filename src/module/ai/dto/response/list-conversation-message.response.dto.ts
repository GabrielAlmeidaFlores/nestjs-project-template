import { GetConversationMessageResponseDto } from '@module/ai/dto/response/get-conversation-message.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListConversationMessageResponseDto extends ListDataResponseDto<GetConversationMessageResponseDto> {
  @ResponseDtoObjectProperty(() => GetConversationMessageResponseDto, {
    isArray: true,
  })
  public override resource: GetConversationMessageResponseDto[];

  protected override readonly _type = ListConversationMessageResponseDto.name;
}
