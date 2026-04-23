import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import { DeathBenefitRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-consideration.enum';
import { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';
import { DeathBenefitRejectionDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-class.enum';
import { DeathBenefitRejectionDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDeathBenefitRejectionInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public inssBenefit: string;

  protected override readonly _type =
    GetDeathBenefitRejectionInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  protected override readonly _type =
    GetDeathBenefitRejectionLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public deathBenefitRejectionFirstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitRejectionCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitRejectionSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitRejectionCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetDeathBenefitRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionLegalRepresentativeResponseDto extends BaseBuildableDtoObject {
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
    GetDeathBenefitRejectionLegalRepresentativeResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionInstitorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoStringProperty({ required: false })
  public cpf?: string;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @ResponseDtoDateProperty({ required: false })
  public deathDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public wasRetired?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public retirementBenefitNumber?: string;

  protected override readonly _type =
    GetDeathBenefitRejectionInstitorResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionDependentDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'Arquivo em Base64',
  })
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDeathBenefitRejectionDependentDocumentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionDependentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoEnumProperty(DeathBenefitRejectionDependentClassEnum)
  public dependentClass: DeathBenefitRejectionDependentClassEnum;

  @ResponseDtoEnumProperty(DeathBenefitRejectionDependentTypeEnum)
  public dependentType: DeathBenefitRejectionDependentTypeEnum;

  @ResponseDtoEnumProperty(GenderEnum)
  public gender: GenderEnum;

  @ResponseDtoDateProperty()
  public birthDate: Date;

  @ResponseDtoBooleanProperty()
  public hasDisabilityOrInvalidism: boolean;

  @ResponseDtoBooleanProperty()
  public isMinorUnder16: boolean;

  @ResponseDtoDateProperty({ required: false })
  public stableUnionOrMarriageStartDate?: Date;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionDependentDocumentResponseDto,
    { required: false, isArray: true },
  )
  public dependentDocuments?: GetDeathBenefitRejectionDependentDocumentResponseDto[];

  protected override readonly _type =
    GetDeathBenefitRejectionDependentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
    GetDeathBenefitRejectionPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(DeathBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: DeathBenefitRejectionCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(DeathBenefitRejectionPeriodPendencyReasonEnum, {
    required: false,
  })
  public pendencyReason?: DeathBenefitRejectionPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoEnumProperty(DeathBenefitRejectionPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: DeathBenefitRejectionPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoStringProperty({ required: false })
  public impact?: string;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoBooleanProperty({ required: false })
  public complementViaMyInss?: boolean;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetDeathBenefitRejectionPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetDeathBenefitRejectionPeriodResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'Arquivo em Base64',
  })
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDeathBenefitRejectionCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitRejectionId)
  public id: DeathBenefitRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionCnisDocumentResponseDto,
    {
      required: false,
    },
  )
  public cnisDocument?: GetDeathBenefitRejectionCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(() => GetDeathBenefitRejectionResultResponseDto, {
    required: false,
  })
  public deathBenefitRejectionResult?: GetDeathBenefitRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionInssBenefitResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public deathBenefitRejectionInssBenefit?: GetDeathBenefitRejectionInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionLegalProceedingResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public deathBenefitRejectionLegalProceeding?: GetDeathBenefitRejectionLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionLegalRepresentativeResponseDto,
    { required: false },
  )
  public deathBenefitRejectionLegalRepresentative?: GetDeathBenefitRejectionLegalRepresentativeResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionInstitorResponseDto,
    {
      required: false,
    },
  )
  public deathBenefitRejectionBenefitInstitutor?: GetDeathBenefitRejectionInstitorResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitRejectionDependentResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public deathBenefitRejectionDependent?: GetDeathBenefitRejectionDependentResponseDto[];

  @ResponseDtoObjectProperty(() => GetDeathBenefitRejectionPeriodResponseDto, {
    isArray: true,
    required: false,
  })
  public deathBenefitRejectionPeriod?: GetDeathBenefitRejectionPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetDeathBenefitRejectionResponseDto.name;
}
