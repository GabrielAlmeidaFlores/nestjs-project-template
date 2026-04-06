import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AsaasWebhookTransferAuthorizationTransferRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public id: string;

  @RequestDtoStringProperty()
  public status: string;

  @RequestDtoStringProperty({ required: false })
  public externalReference?: string;

  protected override readonly _type =
    AsaasWebhookTransferAuthorizationTransferRequestDto.name;
}

@RequestDto()
export class AsaasWebhookTransferAuthorizationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public id: string;

  @RequestDtoStringProperty()
  public event: string;

  @RequestDtoStringProperty()
  public dateCreated: string;

  @RequestDtoObjectProperty(
    () => AsaasWebhookTransferAuthorizationTransferRequestDto,
  )
  public transfer: AsaasWebhookTransferAuthorizationTransferRequestDto;

  protected override readonly _type =
    AsaasWebhookTransferAuthorizationRequestDto.name;
}
