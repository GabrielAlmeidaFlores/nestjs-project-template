import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePowerOfAttorneyGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PowerOfAttorneyGeneratorId)
  public powerOfAttorneyGeneratorId: PowerOfAttorneyGeneratorId;

  @ResponseDtoStringProperty({ required: false })
  public powerOfAttorneyGeneratorCompleteAnalysis?: string;

  protected override readonly _type =
    CreatePowerOfAttorneyGeneratorResponseDto.name;
}
