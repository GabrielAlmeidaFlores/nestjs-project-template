import { GetConversationEventResponseDto } from '@module/ai/infra/chat/dto/response/get-conversation-event.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListConversationEventResponseDto extends ListDataResponseDto<GetConversationEventResponseDto> {
  @ResponseDtoObjectProperty(() => GetConversationEventResponseDto, {
    isArray: true,
  })
  public override resource: GetConversationEventResponseDto[];

  protected override readonly _type = ListConversationEventResponseDto.name;
}
