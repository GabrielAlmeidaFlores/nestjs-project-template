import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateJefWaiverDeclarationGeneratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(JefWaiverDeclarationGeneratorId)
  public jefWaiverDeclarationGeneratorId: JefWaiverDeclarationGeneratorId;

  @ResponseDtoStringProperty({ required: false })
  public jefWaiverDeclarationGeneratorCompleteAnalysis?: string;

  protected override readonly _type = CreateJefWaiverDeclarationGeneratorResponseDto.name;
}
