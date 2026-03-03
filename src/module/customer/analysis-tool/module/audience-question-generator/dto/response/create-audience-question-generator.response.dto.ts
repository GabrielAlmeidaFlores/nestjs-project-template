import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAudienceQuestionGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AudienceQuestionGeneratorId)
  public audienceQuestionGeneratorId: AudienceQuestionGeneratorId;

  protected override readonly _type =
    CreateAudienceQuestionGeneratorResponseDto.name;
}
