import { GetTeacherRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/get-teacher-retirement-planning-remuneration.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListTeacherRetirementPlanningRemunerationResponseDto extends ListDataResponseDto<GetTeacherRetirementPlanningRppsRemunerationResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRppsRemunerationResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetTeacherRetirementPlanningRppsRemunerationResponseDto[];

  protected override readonly _type =
    ListTeacherRetirementPlanningRemunerationResponseDto.name;
}
