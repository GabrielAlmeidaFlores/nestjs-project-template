import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { TeacherRetirementPlanningRppsActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningRppsFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import { TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/dto/response/create-teacher-retirement-planning-result.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetTeacherRetirementPlanningRppsPeriodItemDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsPeriodItemDocumentResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRppsPeriodItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date | null;

  @ResponseDtoStringProperty()
  public institutionName: string | null;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum,
  )
  public institutionType: TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum | null;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum,
  )
  public educationLevel: TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum | null;

  @ResponseDtoEnumProperty(
    TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum,
  )
  public rolePerformed: TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum | null;

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRppsPeriodItemDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetTeacherRetirementPlanningRppsPeriodItemDocumentResponseDto[];

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsPeriodItemResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRppsPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoStringProperty()
  public positionName: string;

  @ResponseDtoStringProperty()
  public careerName: string;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRppsPeriodServiceTypeEnum)
  public serviceType: TeacherRetirementPlanningRppsPeriodServiceTypeEnum;

  @ResponseDtoStringProperty()
  public department: string;

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRppsPeriodItemResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public items?: GetTeacherRetirementPlanningRppsPeriodItemResponseDto[];

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsPeriodResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRppsResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto,
    { required: false },
  )
  public teacherRetirementPlanningCompleteAnalysis?: TeacherRetirementPlanningRppsCompleteAnalysisResultResponseDto;

  @ResponseDtoStringProperty({ required: false })
  public teacherRetirementPlanningSimplifiedAnalysis?: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsResultResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRppsDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsDocumentResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRppsRemunerationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public amount: DecimalValue;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsRemunerationResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRppsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TeacherRetirementPlanningRppsId)
  public teacherRetirementPlanningId: TeacherRetirementPlanningRppsId;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRppsFederativeEntityEnum)
  public federativeEntity: TeacherRetirementPlanningRppsFederativeEntityEnum;

  @ResponseDtoStringProperty({ required: false })
  public state?: string;

  @ResponseDtoStringProperty({ required: false })
  public municipality?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoStringProperty({ required: false })
  public currentPosition?: string;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningRppsActivityTypeEnum)
  public activityType: TeacherRetirementPlanningRppsActivityTypeEnum;

  @ResponseDtoDateProperty({ required: false })
  public publicServiceStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public careerStartDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public administrativeProcessAnalysis?: string;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRppsDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetTeacherRetirementPlanningRppsDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRppsPeriodResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public periods?: GetTeacherRetirementPlanningRppsPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRppsRemunerationResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public remunerations?: GetTeacherRetirementPlanningRppsRemunerationResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningRppsResultResponseDto,
    {
      required: false,
    },
  )
  public teacherRetirementPlanningResult?: GetTeacherRetirementPlanningRppsResultResponseDto;

  @ResponseDtoObjectProperty(() => GetAnalysisToolClientResponseDto)
  public analysisToolClient: GetAnalysisToolClientResponseDto;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsResponseDto.name;
}
