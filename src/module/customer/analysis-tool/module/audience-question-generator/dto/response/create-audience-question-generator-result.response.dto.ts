import { AudienceQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/value-object/audience-question-generator-result-id/audience-question-generator-result-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAudienceQuestionGeneratorResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AudienceQuestionGeneratorResultId)
  public audienceQuestionGeneratorResultId: AudienceQuestionGeneratorResultId;

  protected override readonly _type =
    CreateAudienceQuestionGeneratorResultResponseDto.name;
}
