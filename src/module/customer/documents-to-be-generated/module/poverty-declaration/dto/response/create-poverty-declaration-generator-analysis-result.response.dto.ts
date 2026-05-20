import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePovertyDeclarationGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PovertyDeclarationGeneratorId)
  public povertyDeclarationGeneratorId: PovertyDeclarationGeneratorId;

  @ResponseDtoStringProperty({ required: false })
  public povertyDeclarationGeneratorCompleteAnalysis?: string;

  protected override readonly _type =
    CreatePovertyDeclarationGeneratorResponseDto.name;
}
