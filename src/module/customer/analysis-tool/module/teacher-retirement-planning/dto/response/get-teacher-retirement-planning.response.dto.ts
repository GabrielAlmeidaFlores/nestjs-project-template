import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import { TeacherRetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';

@ResponseDto()
export class GetTeacherRetirementPlanningPeriodItemDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningPeriodItemDocumentResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningPeriodItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoStringProperty()
  public institutionName: string;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningPeriodItemInstitutionTypeEnum)
  public institutionType: TeacherRetirementPlanningPeriodItemInstitutionTypeEnum;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningPeriodItemEducationLevelEnum)
  public educationLevel: TeacherRetirementPlanningPeriodItemEducationLevelEnum;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningPeriodItemRolePerformedEnum)
  public rolePerformed: TeacherRetirementPlanningPeriodItemRolePerformedEnum;

  @ResponseDtoObjectProperty(
    () => GetTeacherRetirementPlanningPeriodItemDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetTeacherRetirementPlanningPeriodItemDocumentResponseDto[];

  protected override readonly _type =
    GetTeacherRetirementPlanningPeriodItemResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoStringProperty()
  public positionName: string;

  @ResponseDtoStringProperty()
  public careerName: string;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningPeriodServiceTypeEnum)
  public serviceType: TeacherRetirementPlanningPeriodServiceTypeEnum;

  @ResponseDtoStringProperty()
  public department: string;

  @ResponseDtoObjectProperty(() => GetTeacherRetirementPlanningPeriodItemResponseDto, {
    required: false,
    isArray: true,
  })
  public items?: GetTeacherRetirementPlanningPeriodItemResponseDto[];

  protected override readonly _type =
    GetTeacherRetirementPlanningPeriodResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public teacherRetirementPlanningCompleteAnalysis?: object;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public teacherRetirementPlanningSimplifiedAnalysis?: object;

  protected override readonly _type =
    GetTeacherRetirementPlanningResultResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningRemunerationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public amount: DecimalValue;

  protected override readonly _type =
    GetTeacherRetirementPlanningRemunerationResponseDto.name;
}

@ResponseDto()
export class GetTeacherRetirementPlanningResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TeacherRetirementPlanningId)
  public teacherRetirementPlanningId: TeacherRetirementPlanningId;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningFederativeEntityEnum)
  public federativeEntity: TeacherRetirementPlanningFederativeEntityEnum;

  @ResponseDtoStringProperty({ required: false })
  public state?: string;

  @ResponseDtoStringProperty({ required: false })
  public municipality?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(TeacherRetirementPlanningActivityTypeEnum)
  public activityType: TeacherRetirementPlanningActivityTypeEnum;

  @ResponseDtoDateProperty()
  public publicServiceStartDate: Date;

  @ResponseDtoDateProperty()
  public careerStartDate: Date;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public documents?: string[];

  @ResponseDtoObjectProperty(() => GetTeacherRetirementPlanningPeriodResponseDto, {
    required: false,
    isArray: true,
  })
  public periods?: GetTeacherRetirementPlanningPeriodResponseDto[];

  @ResponseDtoObjectProperty(() => GetTeacherRetirementPlanningRemunerationResponseDto, {
    required: false,
    isArray: true,
  })
  public remunerations?: GetTeacherRetirementPlanningRemunerationResponseDto[];

  @ResponseDtoObjectProperty(() => GetTeacherRetirementPlanningResultResponseDto, {
    required: false,
  })
  public teacherRetirementPlanningResult?: GetTeacherRetirementPlanningResultResponseDto;

  protected override readonly _type = GetTeacherRetirementPlanningResponseDto.name;
}
