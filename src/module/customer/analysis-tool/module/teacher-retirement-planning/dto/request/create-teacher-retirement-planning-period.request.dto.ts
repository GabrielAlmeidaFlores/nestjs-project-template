import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import { TeacherRetirementPlanningPeriodItemWorkloadTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-workload-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateTeacherRetirementPlanningPeriodItemDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodItemDocumentRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningPeriodItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public readonly startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoEnumProperty(TeacherRetirementPlanningPeriodItemWorkloadTypeEnum, {
    required: true,
  })
  public readonly workloadType: TeacherRetirementPlanningPeriodItemWorkloadTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly institutionName: string;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningPeriodItemInstitutionTypeEnum,
    {
      required: true,
    },
  )
  public readonly institutionType: TeacherRetirementPlanningPeriodItemInstitutionTypeEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningPeriodItemEducationLevelEnum,
    {
      required: true,
    },
  )
  public readonly educationLevel: TeacherRetirementPlanningPeriodItemEducationLevelEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningPeriodItemRolePerformedEnum,
    {
      required: true,
    },
  )
  public readonly rolePerformed: TeacherRetirementPlanningPeriodItemRolePerformedEnum;

  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningPeriodItemDocumentRequestDto,
    { required: false, isArray: true },
  )
  public readonly documents?: CreateTeacherRetirementPlanningPeriodItemDocumentRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningPeriodDataRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly endDate: Date;

  @RequestDtoStringProperty({ required: true })
  public readonly positionName: string;

  @RequestDtoStringProperty({ required: true })
  public readonly careerName: string;

  @RequestDtoEnumProperty(TeacherRetirementPlanningPeriodServiceTypeEnum, {
    required: true,
  })
  public readonly serviceType: TeacherRetirementPlanningPeriodServiceTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly department: string;

  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningPeriodItemRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly items?: CreateTeacherRetirementPlanningPeriodItemRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodDataRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(TeacherRetirementPlanningId)
  public readonly teacherRetirementPlanningId: TeacherRetirementPlanningId;

  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningPeriodDataRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly periods: CreateTeacherRetirementPlanningPeriodDataRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodRequestDto.name;
}
