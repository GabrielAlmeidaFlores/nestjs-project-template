import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateLegalPleadingStatusToCompleteResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalPleadingId: LegalPleadingId;

  protected override readonly _type =
    UpdateLegalPleadingStatusToCompleteResponseDto.name;
}
