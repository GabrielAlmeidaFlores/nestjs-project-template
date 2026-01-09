import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListLegalProceedingDetailByDateRequestDto extends ListDataRequestDto {
  @RequestDtoDateProperty({ required: false })
  public readonly createdAtStart?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly createdAtEnd?: Date;

  protected override readonly _type =
    ListLegalProceedingDetailByDateRequestDto.name;
}
