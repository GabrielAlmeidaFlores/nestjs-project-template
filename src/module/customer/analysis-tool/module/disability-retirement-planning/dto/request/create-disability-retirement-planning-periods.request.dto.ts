import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/enum/disability-retirement-planning-period-disability-document-type.enum';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/enum/disability-retirement-planning-period-special-time-document-type.enum';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodDisabilityDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(Base64)
  public readonly base64: Base64;

  @RequestDtoStringProperty({ required: true })
  public readonly originalFileName: string;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum,
    { required: true },
  )
  public readonly type: DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodDisabilityDocumentRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodSpecialTimeDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(Base64)
  public readonly base64: Base64;

  @RequestDtoStringProperty({ required: true })
  public readonly originalFileName: string;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum,
    { required: true },
  )
  public readonly type: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodSpecialTimeDocumentRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodDisabilityRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoEnumProperty(RetirementPlanningDisabilityDegreeEnum, {
    required: true,
  })
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum;

  @RequestDtoEnumProperty(
    DisabilityRetirementPlanningPeriodDisabilityCategoryEnum,
    {
      required: true,
    },
  )
  public readonly disabilityCategory: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;

  @RequestDtoValueObjectProperty(CidTenId, { required: false })
  public readonly cidTenId?: CidTenId;

  @RequestDtoEnumProperty(RetirementPlanningDisabilityTimeTypeEnum, {
    required: true,
  })
  public readonly disabilityType: RetirementPlanningDisabilityTimeTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly disabilityDescription: string;

  @RequestDtoStringProperty({ required: true })
  public readonly activityImpact: string;

  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningPeriodDisabilityDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateDisabilityRetirementPlanningPeriodDisabilityDocumentRequestDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodDisabilityRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodSpecialTimeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningPeriodSpecialTimeDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateDisabilityRetirementPlanningPeriodSpecialTimeDocumentRequestDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodSpecialTimeRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoStringProperty({ required: true })
  public readonly jobPosition: string;

  @RequestDtoStringProperty({ required: true })
  public readonly careerName: string;

  @RequestDtoEnumProperty(RetirementPlanningPeriodServiceTypeEnum, {
    required: true,
  })
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly department: string;

  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningPeriodDisabilityRequestDto,
    { required: false, isArray: true },
  )
  public readonly disabilities?: CreateDisabilityRetirementPlanningPeriodDisabilityRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningPeriodSpecialTimeRequestDto,
    { required: false, isArray: true },
  )
  public readonly specialTimes?: CreateDisabilityRetirementPlanningPeriodSpecialTimeRequestDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningPeriodRequestDto,
    { isArray: true },
  )
  public readonly periods: CreateDisabilityRetirementPlanningPeriodRequestDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodsRequestDto.name;
}
