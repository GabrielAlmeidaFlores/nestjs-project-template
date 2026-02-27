import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { FederativeEntityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/enum/federative-entity.enum';
import { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodDisabilityDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningPeriodDisabilityDocumentRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningPeriodSpecialTimeDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

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
    { required: false, isArray: true },
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
    { required: false, isArray: true },
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
export class CreateDisabilityRetirementPlanningDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(DisabilityRetirementPlanningDocumentTypeEnum, {
    required: false,
  })
  public readonly type?: DisabilityRetirementPlanningDocumentTypeEnum;

  @RequestDtoObjectProperty(() => Base64FileRequestDto)
  public readonly document: Base64FileRequestDto;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningDocumentRequestDto.name;
}

@RequestDto()
export class CreateDisabilityRetirementPlanningRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public readonly analysisToolClientId: AnalysisToolClientId;

  @RequestDtoStringProperty({ required: true })
  public readonly currentPosition: string;

  @RequestDtoEnumProperty(FederativeEntityEnum, { required: true })
  public readonly federativeEntity: FederativeEntityEnum;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public readonly state?: StateCodeEnum;

  @RequestDtoStringProperty({ required: false })
  public readonly municipality?: string;

  @RequestDtoBooleanProperty({ required: true })
  public readonly longTimeDisability: boolean;

  @RequestDtoDateProperty({ required: true })
  public readonly publicServiceStartDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly careerStartDate: Date;

  @RequestDtoStringProperty({ required: false })
  public readonly analysisName?: string;

  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningDocumentRequestDto,
    { required: false, isArray: true },
  )
  public readonly documents?: CreateDisabilityRetirementPlanningDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateDisabilityRetirementPlanningPeriodRequestDto,
    { required: true, isArray: true },
  )
  public readonly periods: CreateDisabilityRetirementPlanningPeriodRequestDto[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly inssBenefitNumber?: string[];

  @RequestDtoStringProperty({ required: false, isArray: true })
  public readonly legalProceedingNumber?: string[];

  protected override readonly _type =
    CreateDisabilityRetirementPlanningRequestDto.name;
}
