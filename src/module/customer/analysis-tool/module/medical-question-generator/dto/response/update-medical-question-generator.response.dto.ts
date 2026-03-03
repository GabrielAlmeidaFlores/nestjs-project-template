import { MedicalQuestionGeneratorId } from '@module/customer/analysis-tool/module/medical-question-generator/domain/schema/entity/medical-question-generator/value-object/medical-question-generator-id/medical-question-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateMedicalQuestionGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MedicalQuestionGeneratorId)
  public medicalQuestionGeneratorId: MedicalQuestionGeneratorId;

  protected override readonly _type =
    UpdateMedicalQuestionGeneratorResponseDto.name;
}
