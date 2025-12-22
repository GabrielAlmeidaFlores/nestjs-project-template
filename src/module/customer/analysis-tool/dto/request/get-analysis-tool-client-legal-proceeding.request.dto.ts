import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
// import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class GetAnalysisToolClientLegalProceedingRequestDto extends ListDataRequestDto {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: true })
  public readonly analysisToolClientId: AnalysisToolClientId;
  // @RequestDtoDateProperty({ required: false })
  // public readonly createdAtStart?: Date;

  // @RequestDtoDateProperty({ required: false })
  // public readonly createdAtEnd?: Date;

  protected override readonly _type =
    GetAnalysisToolClientLegalProceedingRequestDto.name;
}
