import { GetRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rpps-remuneration.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListRetirementPlanningRppsRemunerationResponseDto extends ListDataResponseDto<GetRetirementPlanningRppsRemunerationResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRppsRemunerationResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetRetirementPlanningRppsRemunerationResponseDto[];

  protected override readonly _type =
    ListRetirementPlanningRppsRemunerationResponseDto.name;
}
