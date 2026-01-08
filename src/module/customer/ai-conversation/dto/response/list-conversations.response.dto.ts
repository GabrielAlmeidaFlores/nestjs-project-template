import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ConversationItemDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Guid)
  public id: Guid;

  @ResponseDtoStringProperty()
  public title: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = ConversationItemDto.name;
}

@ResponseDto()
export class ListConversationsResponseDto extends ListDataResponseDto<ConversationItemDto> {
  @ResponseDtoObjectProperty(() => ConversationItemDto, { isArray: true })
  public override resource: ConversationItemDto[];

  protected override readonly _type = ListConversationsResponseDto.name;
}
