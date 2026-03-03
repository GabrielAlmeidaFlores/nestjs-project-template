import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAdministrativeRequestGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AdministrativeRequestGeneratorId)
  public administrativeRequestGeneratorId: AdministrativeRequestGeneratorId;

  @ResponseDtoStringProperty({ required: false })
  public administrativeRequestGeneratorCompleteAnalysis?: string;

  protected override readonly _type =
    CreateAdministrativeRequestGeneratorResponseDto.name;
}
