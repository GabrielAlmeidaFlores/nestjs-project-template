import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListLegalPleadingRequestDto extends ListDataRequestDto {
  @RequestDtoStringProperty({ required: false })
  public searchBy?: string;

  @RequestDtoEnumProperty(AnalysisStatusEnum, { required: false })
  public status?: AnalysisStatusEnum;

  protected override readonly _type = ListLegalPleadingRequestDto.name;
}
