import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListLegalProceedingDetailRequestDto extends ListDataRequestDto {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: true })
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoValueObjectProperty(AnalysisToolClientLegalProceedingId, {
    required: true,
  })
  public readonly analysisToolClientLegalProceedingId: AnalysisToolClientLegalProceedingId;

  protected override readonly _type = ListLegalProceedingDetailRequestDto.name;
}
