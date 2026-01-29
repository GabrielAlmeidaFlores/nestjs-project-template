import { CnisTimelinePeriodTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/enum/cnis-timeline-period-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GetRuralTimelineCnisAnalysisRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(CnisTimelinePeriodTypeEnum, {
    required: false,
    isArray: true,
  })
  public periodTypes?: CnisTimelinePeriodTypeEnum[];

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  protected override readonly _type =
    GetRuralTimelineCnisAnalysisRequestDto.name;
}
