import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-pendency-reason.enum';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { RetirementPermanentDisabilityRevisionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/enum/retirement-permanent-disability-revision-category.enum';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
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
export class GetRetirementPermanentDisabilityRevisionClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public id: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @ResponseDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public clientType?: AnalysisToolClientTypeEnum;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionClientResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRevisionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public clientLastAffiliationDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public retirementPermanentDisabilityRevisionFirstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public retirementPermanentDisabilityRevisionCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public retirementPermanentDisabilityRevisionSimplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionResultResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRevisionWorkPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPermanentDisabilityRevisionWorkPeriodsId)
  public retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId;

  @ResponseDtoStringProperty()
  public bondOrigin: string;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty()
  public category: string;

  @ResponseDtoBooleanProperty()
  public competenceBelowTheMinimum: boolean;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoNumberProperty()
  public gracePeriod: number;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionWorkPeriodResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
  )
  public retirementPermanentDisabilityRevisionConcessionLetterBreakdownId: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId;

  @ResponseDtoStringProperty()
  public competence: string;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public amount: DecimalValue;

  @ResponseDtoStringProperty()
  public reasonNotConsidered: string;

  @ResponseDtoStringProperty()
  public action: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRevisionResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionResponsibleResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRevisionDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionDocumentResponseDto.name;
}

@ResponseDto()
export class GetRetirementPermanentDisabilityRevisionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPermanentDisabilityRevisionId)
  public id: RetirementPermanentDisabilityRevisionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(RetirementPermanentDisabilityRevisionCategoryEnum, {
    required: false,
  })
  public category?: RetirementPermanentDisabilityRevisionCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public myInssPassword?: string;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRevisionDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?: GetRetirementPermanentDisabilityRevisionDocumentResponseDto[];

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRevisionClientResponseDto,
  )
  public analysisToolClient: GetRetirementPermanentDisabilityRevisionClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRevisionResultResponseDto,
    {
      required: false,
    },
  )
  public retirementPermanentDisabilityRevisionResult?: GetRetirementPermanentDisabilityRevisionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRevisionWorkPeriodResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public workPeriods?: GetRetirementPermanentDisabilityRevisionWorkPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () =>
      GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public concessionLetterBreakdown?: GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRevisionResponsibleResponseDto,
  )
  public createdBy: GetRetirementPermanentDisabilityRevisionResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPermanentDisabilityRevisionResponsibleResponseDto,
  )
  public updatedBy: GetRetirementPermanentDisabilityRevisionResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionResponseDto.name;
}
