import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ListSystemActivitiesCollaboratorsRequestDto } from '@module/customer/system-activities/dto/request/list-system-activities-collaborators.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';

@RequestDto()
export class ListSystemActivitiesCollaboratorsAdminRequestDto extends ListSystemActivitiesCollaboratorsRequestDto {
  @RequestDtoValueObjectProperty(OrganizationId, { required: false })
  public organizationId?: OrganizationId;

  protected override readonly _type =
    ListSystemActivitiesCollaboratorsAdminRequestDto.name;
}
