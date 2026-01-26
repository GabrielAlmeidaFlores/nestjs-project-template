import { MedicalQuestionGeneratorResultId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator-result/value-object/medical-question-generator-result-id/medical-question-generator-result-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMedicalQuestionGeneratorResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MedicalQuestionGeneratorResultId)
  public medicalQuestionGeneratorResultId: MedicalQuestionGeneratorResultId;

  protected override readonly _type =
    CreateMedicalQuestionGeneratorResultResponseDto.name;
}
