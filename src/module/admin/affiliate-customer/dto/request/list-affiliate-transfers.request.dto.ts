import { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class ListAffiliateTransfersRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(TransferStatusEnum, { required: false })
  public status?: TransferStatusEnum;

  protected override readonly _type = ListAffiliateTransfersRequestDto.name;
}
