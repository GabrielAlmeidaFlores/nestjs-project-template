import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetOrganizationAvailableCreditsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public organizationId: string;

  @ResponseDtoNumberProperty()
  public totalPurchased: number;

  @ResponseDtoNumberProperty()
  public totalPurchasedThisMonth: number;

  @ResponseDtoNumberProperty()
  public totalUsed: number;

  @ResponseDtoNumberProperty()
  public availableCredits: number;

  protected override readonly _type =
    GetOrganizationAvailableCreditsResponseDto.name;
}
