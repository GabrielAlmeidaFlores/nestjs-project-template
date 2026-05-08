import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import { TeacherRetirementPlanningRppsPeriodItemWorkloadTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-workload-type.enum';
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

  @RequestDtoEnumProperty(TeacherRetirementPlanningRppsPeriodItemWorkloadTypeEnum, {
    required: false,
  })
  public readonly workloadType?: TeacherRetirementPlanningRppsPeriodItemWorkloadTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly institutionName: string;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum,
    {
      required: true,
    },
  )
  public readonly institutionType: TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum,
    {
      required: true,
    },
  )
  public readonly educationLevel: TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum,
    {
      required: true,
    },
  )
  public readonly rolePerformed: TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum;

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

  @RequestDtoEnumProperty(TeacherRetirementPlanningRppsPeriodServiceTypeEnum, {
    required: true,
  })
  public readonly serviceType: TeacherRetirementPlanningRppsPeriodServiceTypeEnum;

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
  @RequestDtoValueObjectProperty(TeacherRetirementPlanningRppsId)
  public readonly teacherRetirementPlanningId: TeacherRetirementPlanningRppsId;

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
