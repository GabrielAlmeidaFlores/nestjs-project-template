import { TransferAuthorizationStatusEnum } from '@module/generic/bank/enum/transfer-authorization-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AsaasWebhookTransferAuthorizationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(TransferAuthorizationStatusEnum)
  public status: TransferAuthorizationStatusEnum;

  protected override readonly _type =
    AsaasWebhookTransferAuthorizationResponseDto.name;
}
