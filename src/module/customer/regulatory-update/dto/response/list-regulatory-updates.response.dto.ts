import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class RegulatoryUpdateItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RegulatoryUpdateId)
  public regulatoryUpdateId: RegulatoryUpdateId;

  @ResponseDtoStringProperty()
  public title: string;

  @ResponseDtoStringProperty()
  public summary: string;

  @ResponseDtoDateProperty({ required: false })
  public publishedAt?: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = RegulatoryUpdateItemResponseDto.name;
}

@ResponseDto()
export class ListRegulatoryUpdatesResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => RegulatoryUpdateItemResponseDto, {
    isArray: true,
  })
  public items: RegulatoryUpdateItemResponseDto[];

  @ResponseDtoNumberProperty()
  public page: number;

  @ResponseDtoNumberProperty()
  public limit: number;

  @ResponseDtoNumberProperty()
  public totalItems: number;

  @ResponseDtoNumberProperty()
  public totalPages: number;

  protected override readonly _type = ListRegulatoryUpdatesResponseDto.name;
}
