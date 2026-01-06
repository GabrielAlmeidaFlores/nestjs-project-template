import { GetConversationResponseDto } from '@module/ai/chat/dto/response/get-conversation.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRetirementPlanningRppsResultResponseDto extends BaseBuildableDtoObject {
  // no DTO:
  @ResponseDtoStringProperty({ required: true })
  public readonly retirementPlanningRppsCompleteAnalysis: string;

  @ResponseDtoObjectProperty(() => GetConversationResponseDto)
  public conversation: GetConversationResponseDto;

  protected override readonly _type =
    CreateRetirementPlanningRppsResultResponseDto.name;
}
