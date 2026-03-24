import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class ListMyAffiliateCommissionsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public from?: Date;

  @RequestDtoDateProperty({ required: false })
  public to?: Date;

  @RequestDtoStringProperty({ required: false })
  public searchBy?: string;

  protected override readonly _type = ListMyAffiliateCommissionsRequestDto.name;
}
