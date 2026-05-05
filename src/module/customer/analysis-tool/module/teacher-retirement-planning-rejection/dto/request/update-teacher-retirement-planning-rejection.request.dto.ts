import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TeacherRetirementPlanningRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-activity-type.enum';
import { TeacherRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-category.enum';
import { TeacherRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-denial-reason.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTeacherRetirementPlanningRejectionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: false })
  public analysisToolClientId?: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: false })
  public analysisName?: string;

  @RequestDtoDateProperty({ required: false })
  public requestEntryDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public denialDate?: Date;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRejectionCategoryEnum, {
    required: false,
  })
  public category?: TeacherRetirementPlanningRejectionCategoryEnum;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRejectionActivityTypeEnum, {
    required: false,
  })
  public activityType?: TeacherRetirementPlanningRejectionActivityTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public activityTypeDescription?: string;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRejectionDenialReasonEnum, {
    required: false,
  })
  public denialReason?: TeacherRetirementPlanningRejectionDenialReasonEnum;

  @RequestDtoStringProperty({ required: false })
  public denialReasonDescription?: string;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  protected override readonly _type =
    UpdateTeacherRetirementPlanningRejectionRequestDto.name;
}
