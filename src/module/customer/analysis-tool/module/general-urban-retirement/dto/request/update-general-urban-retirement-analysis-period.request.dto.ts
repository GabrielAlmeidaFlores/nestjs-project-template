import { CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/create-general-urban-retirement-analysis-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto extends CreateGeneralUrbanRetirementAnalysisPeriodItemRequestDto {
  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto.name;
}

@RequestDto()
export class UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto,
    { required: true, isArray: true },
  )
  public readonly periods: UpdateGeneralUrbanRetirementAnalysisPeriodItemRequestDto[];

  protected override readonly _type =
    UpdateGeneralUrbanRetirementAnalysisPeriodRequestDto.name;
}
