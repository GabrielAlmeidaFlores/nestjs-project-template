import { TeacherRetirementPlanningRejectionWorkPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/request/create-teacher-retirement-planning-rejection-work-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionWorkPeriodDocumentRequestDto,
    { isArray: true },
  )
  public documents: TeacherRetirementPlanningRejectionWorkPeriodDocumentRequestDto[];

  @RequestDtoStringProperty({ required: false })
  public periodStartDate?: string;

  @RequestDtoStringProperty({ required: false })
  public periodEndDate?: string;

  @RequestDtoStringProperty({ required: false })
  public workerType?: string;

  @RequestDtoStringProperty({ required: false })
  public institutionName?: string;

  @RequestDtoStringProperty({ required: false })
  public educationLevel?: string;

  @RequestDtoStringProperty({ required: false })
  public functionPerformed?: string;

  protected override readonly _type =
    AnalyzeTeacherRetirementPlanningRejectionWorkPeriodDocumentsRequestDto.name;
}
