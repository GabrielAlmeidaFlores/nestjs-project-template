import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class CountLegalProceedingDetailRequestDto extends ListDataRequestDto {
  @RequestDtoValueObjectProperty(CustomerId, { required: true })
  public readonly customerId: CustomerId;

  protected override readonly _type = CountLegalProceedingDetailRequestDto.name;
}
