import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class ListAnalysisToolRecordRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({ example: 1 })
  public page: number;

  @RequestDtoNumberProperty({ example: 10 })
  public limit: number;

  @RequestDtoStringProperty({ required: false, example: '-createdAt' })
  public sortField?: string;

  @RequestDtoEnumProperty(AnalysisToolRecordTypeEnum, { required: false })
  public readonly type?: AnalysisToolRecordTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly clientName?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly code?: string;

  protected override readonly _type = ListAnalysisToolRecordRequestDto.name;
}
