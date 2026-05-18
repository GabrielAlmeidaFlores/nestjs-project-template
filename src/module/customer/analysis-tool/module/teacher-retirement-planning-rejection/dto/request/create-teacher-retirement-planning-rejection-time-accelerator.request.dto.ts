import { TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-analysis-type.enum';
import { TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import { TeacherRetirementPlanningRejectionViabilityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-viability.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum,
    { required: false },
  )
  public timeType?: TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public institution?: string;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum,
    { required: false },
  )
  public recognitionInss?: TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum;

  @RequestDtoBooleanProperty({ required: false })
  public affectsQualifyingPeriod?: boolean;

  @RequestDtoStringProperty({ required: false })
  public technicalNote?: string;

  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRejectionViabilityEnum, {
    required: false,
  })
  public viability?: TeacherRetirementPlanningRejectionViabilityEnum;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto,
    { isArray: true },
  )
  public timeAccelerators: TeacherRetirementPlanningRejectionTimeAcceleratorItemRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningRejectionTimeAcceleratorRequestDto.name;
}
