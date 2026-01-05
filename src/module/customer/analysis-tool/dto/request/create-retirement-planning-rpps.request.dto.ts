import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-special-time-type.enum';
import { RetirementPlanningDisabilityCategoryEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBase64FileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-base64-file-property/request-dto-base64-file-property.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateRetirementPlanningRppsPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RetirementPlanningDocumentTypeEnum, {
    required: true,
  })
  public readonly type: RetirementPlanningDocumentTypeEnum;

  @RequestDtoValueObjectProperty(Base64)
  public readonly document: Base64;

  protected override readonly _type =
    CreateRetirementPlanningRppsPeriodDocumentRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRppsPeriodDisabilityRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly endDate: Date;

  @RequestDtoEnumProperty(RetirementPlanningDisabilityTimeTypeEnum, {
    required: true,
  })
  public readonly type: RetirementPlanningDisabilityTimeTypeEnum;

  @RequestDtoEnumProperty(RetirementPlanningDisabilityDegreeEnum, {
    required: true,
  })
  public readonly degree: RetirementPlanningDisabilityDegreeEnum;

  @RequestDtoEnumProperty(RetirementPlanningDisabilityCategoryEnum, {
    required: true,
  })
  public readonly category: RetirementPlanningDisabilityCategoryEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly description: string;

  @RequestDtoStringProperty({ required: true })
  public readonly dailyImpact: string;

  @RequestDtoValueObjectProperty(CidTenId, { required: true })
  public readonly cidTenId: CidTenId;

  @RequestDtoObjectProperty(
    () => CreateRetirementPlanningRppsPeriodDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateRetirementPlanningRppsPeriodDocumentRequestDto[];

  protected override readonly _type =
    CreateRetirementPlanningRppsPeriodDisabilityRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRppsPeriodSpecialTimeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RetirementPlanningPeriodSpecialTimeTypeEnum, {
    required: true,
  })
  public readonly type: RetirementPlanningPeriodSpecialTimeTypeEnum;

  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly endDate: Date;

  @RequestDtoObjectProperty(
    () => CreateRetirementPlanningRppsPeriodDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: CreateRetirementPlanningRppsPeriodDocumentRequestDto[];

  protected override readonly _type =
    CreateRetirementPlanningRppsPeriodSpecialTimeRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRppsPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly endDate: Date;

  @RequestDtoStringProperty({ required: true })
  public readonly jobPosition: string;

  @RequestDtoStringProperty({ required: true })
  public readonly career: string;

  @RequestDtoEnumProperty(RetirementPlanningPeriodServiceTypeEnum, {
    required: true,
  })
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly department: string;

  @RequestDtoObjectProperty(
    () => CreateRetirementPlanningRppsPeriodSpecialTimeRequestDto,
    {
      required: false,
    },
  )
  public readonly specialTime?: CreateRetirementPlanningRppsPeriodSpecialTimeRequestDto | null;

  @RequestDtoObjectProperty(
    () => CreateRetirementPlanningRppsPeriodDisabilityRequestDto,
    {
      required: false,
    },
  )
  public readonly disability?: CreateRetirementPlanningRppsPeriodDisabilityRequestDto | null;

  protected override readonly _type =
    CreateRetirementPlanningRppsPeriodRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRppsDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RetirementPlanningDocumentTypeEnum, {
    required: false,
  })
  public readonly type?: RetirementPlanningDocumentTypeEnum;

  @RequestDtoBase64FileProperty({
    required: true,
  })
  public readonly document: Base64;

  protected override readonly _type =
    CreateRetirementPlanningRppsDocumentRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRppsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly careerStartDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly publicServiceStartDate: Date;

  @RequestDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoObjectProperty(
    () => CreateRetirementPlanningRppsDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public ctcDocuments?: CreateRetirementPlanningRppsDocumentRequestDto[];

  @RequestDtoObjectProperty(
    () => CreateRetirementPlanningRppsPeriodRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly periods: CreateRetirementPlanningRppsPeriodRequestDto[];

  protected override readonly _type =
    CreateRetirementPlanningRppsRequestDto.name;
}
