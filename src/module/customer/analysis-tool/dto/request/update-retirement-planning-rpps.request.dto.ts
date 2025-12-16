import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-special-time-type.enum';
import { RetirementPlanningDisabilityCategoryEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRetirementPlanningRppsPeriodDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RetirementPlanningDocumentTypeEnum, {
    required: true,
  })
  public readonly type: RetirementPlanningDocumentTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly document: string;

  protected override readonly _type =
    UpdateRetirementPlanningRppsPeriodDocumentRequestDto.name;
}

@RequestDto()
export class UpdateRetirementPlanningRppsDocumentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RetirementPlanningDocumentTypeEnum, {
    required: false,
  })
  public readonly type?: RetirementPlanningDocumentTypeEnum;

  @RequestDtoStringProperty({ required: true })
  public readonly document: string;

  protected override readonly _type =
    UpdateRetirementPlanningRppsDocumentRequestDto.name;
}

@RequestDto()
export class UpdateRetirementPlanningRppsPeriodDisabilityRequestDto extends BaseBuildableDtoObject {
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
    () => UpdateRetirementPlanningRppsPeriodDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: UpdateRetirementPlanningRppsPeriodDocumentRequestDto[];

  protected override readonly _type =
    UpdateRetirementPlanningRppsPeriodDisabilityRequestDto.name;
}

@RequestDto()
export class UpdateRetirementPlanningRppsPeriodSpecialTimeRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(RetirementPlanningPeriodSpecialTimeTypeEnum, {
    required: true,
  })
  public readonly type: RetirementPlanningPeriodSpecialTimeTypeEnum;

  @RequestDtoDateProperty({ required: true })
  public readonly startDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly endDate: Date;

  @RequestDtoObjectProperty(
    () => UpdateRetirementPlanningRppsPeriodDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly documents?: UpdateRetirementPlanningRppsPeriodDocumentRequestDto[];

  protected override readonly _type =
    UpdateRetirementPlanningRppsPeriodSpecialTimeRequestDto.name;
}

@RequestDto()
export class UpdateRetirementPlanningRppsPeriodRequestDto extends BaseBuildableDtoObject {
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
    () => UpdateRetirementPlanningRppsPeriodSpecialTimeRequestDto,
    {
      required: false,
    },
  )
  public readonly specialTime?: UpdateRetirementPlanningRppsPeriodSpecialTimeRequestDto | null;

  @RequestDtoObjectProperty(
    () => UpdateRetirementPlanningRppsPeriodDisabilityRequestDto,
    {
      required: false,
    },
  )
  public readonly disability?: UpdateRetirementPlanningRppsPeriodDisabilityRequestDto | null;

  // @RequestDtoObjectProperty(
  //   () => CreateRetirementPlanningRppsPeriodDocumentRequestDto,
  //   {
  //     required: true,
  //     isArray: true,
  //   },
  // )
  // public readonly documents: CreateRetirementPlanningRppsPeriodDocumentRequestDto[];

  protected override readonly _type =
    UpdateRetirementPlanningRppsPeriodRequestDto.name;
}

@RequestDto()
export class UpdateRetirementPlanningRppsJsonRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: true })
  public readonly careerStartDate: Date;

  @RequestDtoDateProperty({ required: true })
  public readonly publicServiceStartDate: Date;

  @RequestDtoValueObjectProperty(AnalysisToolClientId, { required: true })
  public analysisToolClientId: AnalysisToolClientId;

  @RequestDtoObjectProperty(
    () => UpdateRetirementPlanningRppsPeriodRequestDto,
    {
      required: true,
      isArray: true,
    },
  )
  public readonly periods: UpdateRetirementPlanningRppsPeriodRequestDto[];

  protected override readonly _type =
    UpdateRetirementPlanningRppsJsonRequestDto.name;
}

@RequestDto()
export class UpdateRetirementPlanningRppsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => UpdateRetirementPlanningRppsDocumentRequestDto,
    {
      required: false,
      isArray: true,
    },
  )
  public ctcDocuments?: UpdateRetirementPlanningRppsDocumentRequestDto[];

  @RequestDtoObjectProperty(() => UpdateRetirementPlanningRppsJsonRequestDto)
  public json: UpdateRetirementPlanningRppsJsonRequestDto;

  protected override readonly _type =
    UpdateRetirementPlanningRppsRequestDto.name;
}
