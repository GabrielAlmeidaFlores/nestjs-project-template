import { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListMyAffiliateTransfersRequestDto extends ListDataRequestDto {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoEnumProperty(TransferStatusEnum, { required: false })
  public status?: TransferStatusEnum;

  protected override readonly _type = ListMyAffiliateTransfersRequestDto.name;
}
