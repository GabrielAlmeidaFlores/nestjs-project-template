import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class LegalPleadingItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(LegalPleadingId)
  public legalPleadingId: LegalPleadingId;

  @ResponseDtoStringProperty()
  public documentType: string;

  @ResponseDtoStringProperty()
  public clientName: string;

  @ResponseDtoStringProperty()
  public organizationName: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = LegalPleadingItemResponseDto.name;
}
