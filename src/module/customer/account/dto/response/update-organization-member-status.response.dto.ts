import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateOrganizationMemberStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(OrganizationMemberId)
  public organizationMemberId: OrganizationMemberId;

  protected override readonly _type =
    UpdateOrganizationMemberStatusResponseDto.name;
}
