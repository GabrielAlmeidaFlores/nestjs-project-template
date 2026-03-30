import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
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
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly endDate: Date;

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
export class CreateTeacherRetirementPlanningPeriodRequestDto extends BaseBuildableDtoObject {
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
      required: true,
      isArray: true,
    },
  )
  public readonly items: CreateTeacherRetirementPlanningPeriodItemRequestDto[];

  protected override readonly _type =
    CreateTeacherRetirementPlanningPeriodRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRemunerationItemRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly contributionDate: Date;

  @RequestDtoValueObjectProperty(DecimalValue, { required: true })
  public readonly amount: DecimalValue;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRemunerationItemRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateTeacherRetirementPlanningDocumentRequestDto.name;
}

@RequestDto()
export class CreateTeacherRetirementPlanningRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoEnumProperty(TeacherRetirementPlanningFederativeEntityEnum)
  public readonly federativeEntity: TeacherRetirementPlanningFederativeEntityEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly state?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly municipality?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly analysisName?: string;

  @RequestDtoStringProperty({ required: false })
  public readonly currentPosition?: string;

  @RequestDtoEnumProperty(TeacherRetirementPlanningActivityTypeEnum)
  public readonly activityType: TeacherRetirementPlanningActivityTypeEnum;

  @RequestDtoDateProperty({ required: true })
  public readonly publicServiceStartDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly careerStartDate: Date;

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly legalProceedingNumber?: string[];

  @RequestDtoObjectProperty(
    () => CreateTeacherRetirementPlanningDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateTeacherRetirementPlanningDocumentRequestDto[];

  @RequestDtoStringProperty({ required: false })
  public readonly administrativeProcessAnalysis?: string;

  protected override readonly _type =
    CreateTeacherRetirementPlanningRequestDto.name;
}
