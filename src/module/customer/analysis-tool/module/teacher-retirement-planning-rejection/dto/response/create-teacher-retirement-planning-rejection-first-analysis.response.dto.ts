import { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import { TeacherRetirementPlanningRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/interface/teacher-retirement-planning-rejection-first-analysis.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateTeacherRetirementPlanningRejectionFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object)
  public teacherRetirementPlanningRejectionFirstAnalysis: TeacherRetirementPlanningRejectionFirstAnalysisInterface;

  @ResponseDtoObjectProperty(() => Object)
  public cnisAnalysis: CnisAnalysisResultModel;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRejectionFirstAnalysisResponseDto.name;
}
