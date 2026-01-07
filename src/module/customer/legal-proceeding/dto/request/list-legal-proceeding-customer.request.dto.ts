import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListLegalProceedingCustomerRequestDto extends ListDataRequestDto {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: true })
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public readonly status?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly legalProceedingNumber?: string;

  @RequestDtoDateProperty({ required: false })
  public readonly startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  protected override readonly _type =
    ListLegalProceedingCustomerRequestDto.name;
}
