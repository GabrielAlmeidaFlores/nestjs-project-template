import { SurvivorPensionAnalysisRemunerationItemRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/survivor-pension-analysis-remuneration-item.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoObjectProperty(
    () => SurvivorPensionAnalysisRemunerationItemRequestDto,
    { required: false, isArray: true },
  )
  public remunerations?: SurvivorPensionAnalysisRemunerationItemRequestDto[];

  protected override readonly _type =
    CreateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto.name;
}
