import { TeacherRetirementPlanningRejectionWorkPeriodDocumentProbativeForceEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-document-probative-force.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public documentType: string;

  @ResponseDtoBooleanProperty()
  public ownName: boolean;

  @ResponseDtoStringProperty()
  public documentYear: string;

  @ResponseDtoStringProperty()
  public shortDescription: string;

  @ResponseDtoStringProperty()
  public technicalNote: string;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRejectionWorkPeriodDocumentProbativeForceEnum,
  )
  public probativeForce: TeacherRetirementPlanningRejectionWorkPeriodDocumentProbativeForceEnum;

  protected override readonly _type =
    AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentAnalysisItemResponseDto.name;
}
