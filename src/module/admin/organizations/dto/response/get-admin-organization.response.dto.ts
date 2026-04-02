import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAdminOrganizationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(OrganizationId)
  public id: OrganizationId;

  @ResponseDtoStringProperty()
  public name: string;

  protected override readonly _type = GetAdminOrganizationResponseDto.name;
}
