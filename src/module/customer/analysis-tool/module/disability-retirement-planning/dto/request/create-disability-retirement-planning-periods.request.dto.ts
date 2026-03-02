import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

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

  @RequestDtoEnumProperty(DisabilityRetirementPlanningPeriodDisabilityCategoryEnum, {
    required: true,
  })
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

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { required: false, isArray: true })
  public readonly documents?: Base64FileRequestDto[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodDisabilityRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodSpecialTimeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: false })
  public readonly endDate?: Date;

  @RequestDtoObjectProperty(() => Base64FileRequestDto, { required: false, isArray: true })
  public readonly documents?: Base64FileRequestDto[];

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
