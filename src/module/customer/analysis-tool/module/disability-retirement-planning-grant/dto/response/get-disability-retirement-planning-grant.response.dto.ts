import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';
import { DisabilityRetirementPlanningGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/generic/disability-retirement-planning-grant-first-analysis.model';
import { DisabilityRetirementPlanningGrantResultInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-result.interface';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public inssBenefit: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public disabilityRetirementPlanningGrantCompleteAnalysis?: DisabilityRetirementPlanningGrantResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public disabilityRetirementPlanningGrantSimplifiedAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantFirstAnalysisModel,
    { required: false },
  )
  public disabilityRetirementPlanningGrantFirstAnalysis?: DisabilityRetirementPlanningGrantFirstAnalysisModel;

  @ResponseDtoStringProperty({ required: false })
  public disabilityRetirementPlanningGrantCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantResultResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public competence?: Date;

  @ResponseDtoStringProperty({ required: false })
  public remuneration?: string;

  @ResponseDtoStringProperty({ required: false })
  public indicators?: string;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public contribution?: string;

  @ResponseDtoStringProperty({ required: false })
  public contributionSalary?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysis?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantPeriodInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningGrantCategoryEnum, {
    required: false,
  })
  public category?: DisabilityRetirementPlanningGrantCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
    { required: false },
  )
  public disabilityStatus?: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: DisabilityRetirementPlanningGrantPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningGrantPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetDisabilityRetirementPlanningGrantPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantPeriodInGrantResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantDisabilityPeriodInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
  )
  public disabilityDegree: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantDisabilityCategoryEnum,
  )
  public disabilityCategory: DisabilityRetirementPlanningGrantDisabilityCategoryEnum;

  @ResponseDtoStringProperty()
  public disabilityDescription: string;

  @ResponseDtoStringProperty()
  public dailyImpact: string;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public cidTenId?: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantDisabilityPeriodInGrantResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantTimeAcceleratorInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum,
  )
  public type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum,
  )
  public recognitionInss: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum;

  @ResponseDtoEnumProperty(
    DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum,
  )
  public recognitionJudicial: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningGrantViabilityEnum)
  public viability: DisabilityRetirementPlanningGrantViabilityEnum;

  @ResponseDtoStringProperty({ required: false })
  public technicalNote?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public institution?: string;

  @ResponseDtoBooleanProperty()
  public affectsQualifyingPeriod: boolean;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantTimeAcceleratorInGrantResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetDisabilityRetirementPlanningGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DisabilityRetirementPlanningGrantId)
  public id: DisabilityRetirementPlanningGrantId;

  @ResponseDtoEnumProperty(DisabilityRetirementPlanningGrantCategoryEnum)
  public category: DisabilityRetirementPlanningGrantCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoBooleanProperty()
  public longPrizeDisability: boolean;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningGrantCnisDocumentResponseDto,
    { required: false },
  )
  public cnisDocument?: GetDisabilityRetirementPlanningGrantCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningGrantResultResponseDto,
    { required: false },
  )
  public disabilityRetirementPlanningGrantResult?: GetDisabilityRetirementPlanningGrantResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningGrantInssBenefitResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningGrantInssBenefit?: GetDisabilityRetirementPlanningGrantInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningGrantLegalProceedingResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningGrantLegalProceeding?: GetDisabilityRetirementPlanningGrantLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningGrantPeriodInGrantResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningGrantPeriod?: GetDisabilityRetirementPlanningGrantPeriodInGrantResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetDisabilityRetirementPlanningGrantDisabilityPeriodInGrantResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningGrantDisabilityPeriod?: GetDisabilityRetirementPlanningGrantDisabilityPeriodInGrantResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityRetirementPlanningGrantTimeAcceleratorInGrantResponseDto,
    { isArray: true, required: false },
  )
  public disabilityRetirementPlanningGrantTimeAccelerator?: GetDisabilityRetirementPlanningGrantTimeAcceleratorInGrantResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantResponseDto.name;
}
