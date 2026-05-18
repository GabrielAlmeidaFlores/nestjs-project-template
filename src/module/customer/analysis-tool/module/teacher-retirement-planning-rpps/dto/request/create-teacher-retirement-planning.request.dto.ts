import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TeacherRetirementPlanningRppsActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningRppsFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
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

  @RequestDtoStringProperty({ required: false })
  public readonly institutionName?: string;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum,
    {
      required: false,
    },
  )
  public readonly institutionType?: TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum,
    {
      required: false,
    },
  )
  public readonly educationLevel?: TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum;

  @RequestDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum,
    {
      required: false,
    },
  )
  public readonly rolePerformed?: TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum;

  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningPeriodItemDocumentRequestDto,
    { required: false, isArray: true },
  )
  public readonly documents?: CreateTeacherRetirementPlanningPeriodItemDocumentRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodItemRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public readonly startDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoStringProperty({ required: false })
  public readonly positionName?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly careerName?: string;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRppsPeriodServiceTypeEnum, {
    required: false,
  })
  public readonly serviceType?: TeacherRetirementPlanningRppsPeriodServiceTypeEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly department?: string;

  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningPeriodItemRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly items?: CreateTeacherRetirementPlanningPeriodItemRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRemunerationItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public readonly contributionDate?: Date;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public readonly amount?: DecimalValue;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRemunerationItemRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRppsDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRppsDocumentRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRppsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRppsFederativeEntityEnum, {
    required: false,
  })
  public readonly federativeEntity?: TeacherRetirementPlanningRppsFederativeEntityEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly state?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly municipality?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly analysisName?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly currentPosition?: string;

  @RequestDtoEnumProperty(TeacherRetirementPlanningRppsActivityTypeEnum)
  public readonly activityType: TeacherRetirementPlanningRppsActivityTypeEnum;

  @RequestDtoDateProperty({ required: false })
  public readonly publicServiceStartDate?: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly careerStartDate?: Date;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningRppsDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateTeacherRetirementPlanningRppsDocumentRequestDto[];

  @RequestDtoStringProperty({ required: false })
  public readonly administrativeProcessAnalysis?: string;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRppsRequestDto.name;
}
