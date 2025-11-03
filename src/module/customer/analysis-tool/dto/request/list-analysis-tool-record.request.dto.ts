import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListAnalysisToolRecordRequestDto extends ListDataRequestDto {
  @RequestDtoEnumProperty(AnalysisToolRecordTypeEnum, { required: false })
  public readonly type?: AnalysisToolRecordTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly searchBy?: string;

  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public readonly analysisToolClientId?: AnalysisToolClientId;

  protected override readonly _type = ListAnalysisToolRecordRequestDto.name;
}
