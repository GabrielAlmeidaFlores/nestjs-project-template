import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateAdminRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  protected override readonly _type = UpdateAdminRequestDto.name;
}
