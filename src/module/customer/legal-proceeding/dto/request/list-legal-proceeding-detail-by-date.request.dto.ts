import { LegalProceedingStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/enum/legal-proceeding-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListLegalProceedingDetailByDateRequestDto extends ListDataRequestDto {
  @RequestDtoEnumProperty(LegalProceedingStatusEnum, { required: false })
  public readonly status?: LegalProceedingStatusEnum;

  @RequestDtoDateProperty({ required: false })
  public readonly createdAtStart?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly createdAtEnd?: Date;

  protected override readonly _type =
    ListLegalProceedingDetailByDateRequestDto.name;
}
