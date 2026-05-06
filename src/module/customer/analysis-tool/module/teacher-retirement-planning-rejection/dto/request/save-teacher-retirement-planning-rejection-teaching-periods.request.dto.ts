import { TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-education-level.enum';
import { TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-establishment-type.enum';
import { TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-function-performed.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class TeacherRetirementPlanningRejectionTeachingPeriodDocumentItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public file: Base64FileRequestDto;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodDocumentItemRequestDto.name;
}

@RequestDto()
export class TeacherRetirementPlanningRejectionTeachingPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public institutionName?: string;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum,
    { required: false },
  )
  public establishmentType?: TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum,
    { required: false },
  )
  public educationLevel?: TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum,
    { required: false },
  )
  public functionPerformed?: TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum;

  @RequestDtoStringProperty({ required: false })
  public rejectionReason?: string;

  @RequestDtoStringProperty({ required: false })
  public legalBasisForRecognition?: string;

  @RequestDtoStringProperty({ required: false })
  public favorableJurisprudence?: string;

  @RequestDtoStringProperty({ required: false })
  public proofStrategy?: string;

  @RequestDtoObjectProperty(
    () =>
      TeacherRetirementPlanningRejectionTeachingPeriodDocumentItemRequestDto,
    { required: false, isArray: true },
  )
  public documents?: TeacherRetirementPlanningRejectionTeachingPeriodDocumentItemRequestDto[];

  protected override readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodItemRequestDto.name;
}

@RequestDto()
export class SaveTeacherRetirementPlanningRejectionTeachingPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => TeacherRetirementPlanningRejectionTeachingPeriodItemRequestDto,
    { isArray: true },
  )
  public teachingPeriods: TeacherRetirementPlanningRejectionTeachingPeriodItemRequestDto[];

  protected override readonly _type =
    SaveTeacherRetirementPlanningRejectionTeachingPeriodsRequestDto.name;
}
