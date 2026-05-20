import { GetDisabilityRetirementPlanningRejectionPeriodResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/dto/response/get-disability-retirement-planning-rejection-period.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListDisabilityRetirementPlanningRejectionPeriodsResponseDto extends ListDataResponseDto<GetDisabilityRetirementPlanningRejectionPeriodResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningRejectionPeriodResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetDisabilityRetirementPlanningRejectionPeriodResponseDto[];

  protected override readonly _type =
    ListDisabilityRetirementPlanningRejectionPeriodsResponseDto.name;
}
