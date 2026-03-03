import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateLegalPleadingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(LegalPleadingId)
  public legalPleadingId: LegalPleadingId;

  protected override readonly _type = UpdateLegalPleadingResponseDto.name;
}
