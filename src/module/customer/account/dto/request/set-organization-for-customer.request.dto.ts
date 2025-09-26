import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@RequestDto()
export class SetOrganizationForCustomerRequestDto extends BaseBuildableObject {
  @RequestDtoValueObjectProperty(OrganizationId)
  public organizationId: OrganizationId;

  protected override readonly _type = SetOrganizationForCustomerRequestDto.name;
}
