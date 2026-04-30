import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/enum/special-retirement-grant-document-type.enum';
import { SpecialRetirementGrantDocumentId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/value-object/special-retirement-grant-document-id/special-retirement-grant-document-id.value-object';
import { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import { SpecialRetirementGrantPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/value-object/special-retirement-grant-period-overdue-contribution-id/special-retirement-grant-period-overdue-contribution-id.value-object';
import { SpecialRetirementGrantPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/value-object/special-retirement-grant-period-pending-exit-date-id/special-retirement-grant-period-pending-exit-date-id.value-object';
import { SpecialRetirementGrantPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/value-object/special-retirement-grant-period-under-minimum-id/special-retirement-grant-period-under-minimum-id.value-object';
import { SpecialRetirementGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/special-retirement-grant/model/generic/special-retirement-grant-first-analysis.model';
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
export class GetSpecialRetirementGrantClientResponseDto extends BaseBuildableDtoObject {
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
    GetSpecialRetirementGrantClientResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantDocumentId)
  public id: string;

  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public documentOriginalFileName: string;

  @ResponseDtoEnumProperty(SpecialRetirementGrantDocumentTypeEnum)
  public type: SpecialRetirementGrantDocumentTypeEnum;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantDocumentResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialRetirementGrantCompleteAnalysis?: object;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialRetirementGrantSimplifiedAnalysis?: object;

  @ResponseDtoObjectProperty(() => SpecialRetirementGrantFirstAnalysisModel, {
    required: false,
  })
  public specialRetirementGrantFirstAnalysis?: SpecialRetirementGrantFirstAnalysisModel;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantResultResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantPeriodOverdueContributionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SpecialRetirementGrantPeriodOverdueContributionId,
  )
  public id: SpecialRetirementGrantPeriodOverdueContributionId;

  @ResponseDtoDateProperty()
  public overdueDate: Date;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodOverdueContributionResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantPeriodUnderMinimumResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantPeriodUnderMinimumId)
  public id: SpecialRetirementGrantPeriodUnderMinimumId;

  @ResponseDtoDateProperty()
  public contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public contributionAmount: DecimalValue;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodUnderMinimumResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantPeriodPendingExitDateResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantPeriodPendingExitDateId)
  public id: SpecialRetirementGrantPeriodPendingExitDateId;

  @ResponseDtoDateProperty()
  public pendingDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public pendingAmount: DecimalValue;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodPendingExitDateResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantPeriodObservationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoStringProperty()
  public observation: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodObservationResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantPeriodId)
  public id: SpecialRetirementGrantPeriodId;

  @ResponseDtoNumberProperty({ required: false })
  public sequencial?: number;

  @ResponseDtoStringProperty({ required: false })
  public employmentRelationshipSource?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoEnumProperty(SpecialRetirementGrantPeriodStatusEnum, {
    required: false,
  })
  public status?: SpecialRetirementGrantPeriodStatusEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public averageContributionAmount?: DecimalValue;

  @ResponseDtoBooleanProperty()
  public shouldConsiderPeriod: boolean;

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementGrantPeriodOverdueContributionResponseDto,
    { isArray: true, required: false },
  )
  public overdueContributions?: GetSpecialRetirementGrantPeriodOverdueContributionResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementGrantPeriodUnderMinimumResponseDto,
    { isArray: true, required: false },
  )
  public underMinimums?: GetSpecialRetirementGrantPeriodUnderMinimumResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementGrantPeriodPendingExitDateResponseDto,
    { isArray: true, required: false },
  )
  public pendingExitDates?: GetSpecialRetirementGrantPeriodPendingExitDateResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementGrantPeriodObservationResponseDto,
    { isArray: true, required: false },
  )
  public observations?: GetSpecialRetirementGrantPeriodObservationResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodResponseDto.name;
}

@ResponseDto()
export class GetSpecialRetirementGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialRetirementGrantId)
  public id: SpecialRetirementGrantId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoBooleanProperty()
  public specialActivity: boolean;

  @ResponseDtoStringProperty({
    required: false,
  })
  public cnisDocument?: string;

  @ResponseDtoStringProperty({
    required: false,
  })
  public cnisDocumentOriginalFileName?: string;

  @ResponseDtoObjectProperty(
    () => GetSpecialRetirementGrantDocumentResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public documents?: GetSpecialRetirementGrantDocumentResponseDto[];

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetSpecialRetirementGrantClientResponseDto)
  public analysisToolClient: GetSpecialRetirementGrantClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(() => GetSpecialRetirementGrantResultResponseDto, {
    required: false,
  })
  public specialRetirementGrantResult?: GetSpecialRetirementGrantResultResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetSpecialRetirementGrantResponseDto.name;
}
