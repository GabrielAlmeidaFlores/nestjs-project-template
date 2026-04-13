import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import { DeathBenefitGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-consideration.enum';
import { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';
import { DeathBenefitGrantDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-class.enum';
import { DeathBenefitGrantDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDeathBenefitGrantInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public inssBenefit: string;

  protected override readonly _type =
    GetDeathBenefitGrantInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  protected override readonly _type =
    GetDeathBenefitGrantLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public deathBenefitGrantFirstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitGrantCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitGrantSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public deathBenefitGrantCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetDeathBenefitGrantResultResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantLegalRepresentativeResponseDto extends BaseBuildableDtoObject {
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
    GetDeathBenefitGrantLegalRepresentativeResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantInstitorResponseDto extends BaseBuildableDtoObject {
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
    GetDeathBenefitGrantInstitorResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantDependentDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'Arquivo em Base64',
  })
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDeathBenefitGrantDependentDocumentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantDependentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoEnumProperty(DeathBenefitGrantDependentClassEnum)
  public dependentClass: DeathBenefitGrantDependentClassEnum;

  @ResponseDtoEnumProperty(DeathBenefitGrantDependentTypeEnum)
  public dependentType: DeathBenefitGrantDependentTypeEnum;

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
    () => GetDeathBenefitGrantDependentDocumentResponseDto,
    { required: false, isArray: true },
  )
  public dependentDocuments?: GetDeathBenefitGrantDependentDocumentResponseDto[];

  protected override readonly _type =
    GetDeathBenefitGrantDependentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
    GetDeathBenefitGrantPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(DeathBenefitGrantCategoryEnum, { required: false })
  public category?: DeathBenefitGrantCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(DeathBenefitGrantPeriodPendencyReasonEnum, {
    required: false,
  })
  public pendencyReason?: DeathBenefitGrantPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoEnumProperty(DeathBenefitGrantPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: DeathBenefitGrantPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitGrantPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetDeathBenefitGrantPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetDeathBenefitGrantPeriodResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'Arquivo em Base64',
  })
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDeathBenefitGrantCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetDeathBenefitGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DeathBenefitGrantId)
  public id: DeathBenefitGrantId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitGrantCnisDocumentResponseDto,
    {
      required: false,
    },
  )
  public cnisDocument?: GetDeathBenefitGrantCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(() => GetDeathBenefitGrantResultResponseDto, {
    required: false,
  })
  public deathBenefitGrantResult?: GetDeathBenefitGrantResultResponseDto;

  @ResponseDtoObjectProperty(() => GetDeathBenefitGrantInssBenefitResponseDto, {
    isArray: true,
    required: false,
  })
  public deathBenefitGrantInssBenefit?: GetDeathBenefitGrantInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitGrantLegalProceedingResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public deathBenefitGrantLegalProceeding?: GetDeathBenefitGrantLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetDeathBenefitGrantLegalRepresentativeResponseDto,
    { required: false },
  )
  public deathBenefitGrantLegalRepresentative?: GetDeathBenefitGrantLegalRepresentativeResponseDto;

  @ResponseDtoObjectProperty(() => GetDeathBenefitGrantInstitorResponseDto, {
    required: false,
  })
  public deathBenefitGrantBenefitInstitutor?: GetDeathBenefitGrantInstitorResponseDto;

  @ResponseDtoObjectProperty(() => GetDeathBenefitGrantDependentResponseDto, {
    isArray: true,
    required: false,
  })
  public deathBenefitGrantDependent?: GetDeathBenefitGrantDependentResponseDto[];

  @ResponseDtoObjectProperty(() => GetDeathBenefitGrantPeriodResponseDto, {
    isArray: true,
    required: false,
  })
  public deathBenefitGrantPeriod?: GetDeathBenefitGrantPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetDeathBenefitGrantResponseDto.name;
}
