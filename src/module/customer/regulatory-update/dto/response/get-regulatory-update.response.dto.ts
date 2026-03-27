import { RegulatoryUpdateId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update/value-object/regulatory-update-id/regulatory-update-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import {
  ResponseDtoStringProperty,
  ResponseDtoStringProperty as ResponseDtoArrayStringProperty,
} from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRegulatoryUpdateResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RegulatoryUpdateId)
  public regulatoryUpdateId: RegulatoryUpdateId;

  @ResponseDtoStringProperty()
  public title: string;

  @ResponseDtoStringProperty()
  public summary: string;

  @ResponseDtoArrayStringProperty({ isArray: true })
  public mainChanges: string[];

  @ResponseDtoStringProperty()
  public implementationStatus: string;

  @ResponseDtoStringProperty()
  public beneficiaryImpact: string;

  @ResponseDtoStringProperty()
  public fullText: string;

  @ResponseDtoStringProperty({ required: false })
  public sourceUrl?: string;

  @ResponseDtoDateProperty({ required: false })
  public publishedAt?: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetRegulatoryUpdateResponseDto.name;
}
