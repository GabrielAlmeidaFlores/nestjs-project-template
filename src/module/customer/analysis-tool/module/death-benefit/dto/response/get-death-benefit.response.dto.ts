import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-category.enum';
import { DeathBenefitPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-consideration.enum';
import { DeathBenefitPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-pendency-reason.enum';
import { DeathBenefitDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-class.enum';
import { DeathBenefitDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDeathBenefitInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public inssBenefit: string;

  protected override readonly _type = GetDeathBenefitInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  protected override readonly _type =
    GetDeathBenefitLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public deathBenefitFirstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitCompleteAnalysisDownload?: string;

  protected override readonly _type = GetDeathBenefitResultResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitLegalRepresentativeResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public cpf?: string;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public legalRepresentativeRelationship?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isMinorUnderGuardianship?: boolean;

  protected override readonly _type =
    GetDeathBenefitLegalRepresentativeResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitBenefitInstitorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public cpf?: string;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public sex?: GenderEnum;

  @ResponseDtoDateProperty({ required: false })
  public deathDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public wasRetired?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public retirementBenefitNumber?: string;

  protected override readonly _type =
    GetDeathBenefitBenefitInstitorResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitDependentDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDeathBenefitDependentDocumentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitDependentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoEnumProperty(DeathBenefitDependentClassEnum)
  public dependentClass: DeathBenefitDependentClassEnum;

  @ResponseDtoEnumProperty(DeathBenefitDependentTypeEnum)
  public dependentType: DeathBenefitDependentTypeEnum;

  @ResponseDtoEnumProperty(GenderEnum)
  public sex: GenderEnum;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoBooleanProperty()
  public hasDisabilityOrInvalidism: boolean;

  @ResponseDtoBooleanProperty()
  public isMinorUnder16: boolean;

  @ResponseDtoDateProperty({ required: false })
  public stableUnionOrMarriageStartDate?: Date;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitDependentDocumentResponseDto,
    { required: false, isArray: true },
  )
  public dependentDocuments?: GetDeathBenefitDependentDocumentResponseDto[];

  protected override readonly _type = GetDeathBenefitDependentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
    GetDeathBenefitPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(DeathBenefitCategoryEnum, { required: false })
  public category?: DeathBenefitCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(DeathBenefitPeriodPendencyReasonEnum, {
    required: false,
  })
  public pendencyReason?: DeathBenefitPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoEnumProperty(DeathBenefitPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: DeathBenefitPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetDeathBenefitPeriodEarningsHistoryResponseDto[];

  protected override readonly _type = GetDeathBenefitPeriodResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDeathBenefitCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitId)
  public id: DeathBenefitId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoObjectProperty(() => GetDeathBenefitCnisDocumentResponseDto, {
    required: false,
  })
  public cnisDocument?: GetDeathBenefitCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(() => GetDeathBenefitResultResponseDto, {
    required: false,
  })
  public deathBenefitResult?: GetDeathBenefitResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitInssBenefitResponseDto,
    { isArray: true, required: false },
  )
  public deathBenefitInssBenefit?: GetDeathBenefitInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitLegalProceedingResponseDto,
    { isArray: true, required: false },
  )
  public deathBenefitLegalProceeding?: GetDeathBenefitLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitLegalRepresentativeResponseDto,
    { required: false },
  )
  public deathBenefitLegalRepresentative?: GetDeathBenefitLegalRepresentativeResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitBenefitInstitorResponseDto,
    { required: false },
  )
  public deathBenefitBenefitInstitutor?: GetDeathBenefitBenefitInstitorResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitDependentResponseDto,
    { isArray: true, required: false },
  )
  public deathBenefitDependent?: GetDeathBenefitDependentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitPeriodResponseDto,
    { isArray: true, required: false },
  )
  public deathBenefitPeriod?: GetDeathBenefitPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetDeathBenefitResponseDto.name;
}
