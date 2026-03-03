import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateFullOpinionGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(FullOpinionGeneratorId)
  public fullOpinionGeneratorId: FullOpinionGeneratorId;

  @ResponseDtoStringProperty({ required: false })
  public fullOpinionGeneratorCompleteAnalysis?: string;

  protected override readonly _type =
    CreateFullOpinionGeneratorResponseDto.name;
}
