import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CustomerTermsAcceptanceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerTermsAcceptanceId)
  public customerTermsAcceptance: CustomerTermsAcceptanceId;

  protected override readonly _type = CustomerTermsAcceptanceResponseDto.name;
}
