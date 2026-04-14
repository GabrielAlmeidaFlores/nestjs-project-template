import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/enum/temporary-disability-benefits-grant-severe-disease.enum';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-pendency-reason.enum';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-period-consideration.enum';
import { TemporaryDisabilityBenefitsGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/generic/temporary-disability-benefits-grant-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { TemporaryDisabilityBenefitsGrantResultInterface } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/model/interface/temporary-disability-benefits-grant-result.interface';

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public analysisToolClientId: AnalysisToolClientId;

  @ResponseDtoStringProperty({ required: false })
  public name?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @ResponseDtoValueObjectProperty(Email, { required: false })
  public corporateEmail?: Email;

  @ResponseDtoValueObjectProperty(PhoneNumber, { required: false })
  public phoneNumber?: PhoneNumber;

  @ResponseDtoDateProperty({ required: false })
  public birthDate?: Date;

  @ResponseDtoEnumProperty(GenderEnum, { required: false })
  public gender?: GenderEnum;

  @ResponseDtoEnumProperty(AnalysisToolClientTypeEnum, { required: false })
  public clientType?: AnalysisToolClientTypeEnum;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public temporaryDisabilityBenefitsGrantCompleteAnalysis?: TemporaryDisabilityBenefitsGrantResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public temporaryDisabilityBenefitsGrantSimplifiedAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => TemporaryDisabilityBenefitsGrantFirstAnalysisModel,
    { required: false },
  )
  public temporaryDisabilityBenefitsGrantFirstAnalysis?: TemporaryDisabilityBenefitsGrantFirstAnalysisModel;

  @ResponseDtoStringProperty({ required: false })
  public temporaryDisabilityBenefitsGrantCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantResultResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantPeriodDocumentInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantPeriodDocumentInGrantResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantPreviousBenefitsInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public benefitNumber: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantPreviousBenefitsInGrantResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantPeriodInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public cidTenId?: string;

  @ResponseDtoStringProperty({ required: false })
  public description?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public jobDerivatedDisability?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public disablingConditionDescription?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public disabilityFromSevereDisease?: boolean;

  @ResponseDtoEnumProperty(TemporaryDisabilityBenefitsGrantSevereDiseaseEnum, {
    required: false,
  })
  public severeDisease?: TemporaryDisabilityBenefitsGrantSevereDiseaseEnum;

  @ResponseDtoDateProperty({ required: false })
  public diseaseStartDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public needsConstantAssistanceFromAnotherPerson?: boolean;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantPeriodDocumentInGrantResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetTemporaryDisabilityBenefitsGrantPeriodDocumentInGrantResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantPreviousBenefitsInGrantResponseDto,
    { required: false, isArray: true },
  )
  public previousBenefits?: GetTemporaryDisabilityBenefitsGrantPreviousBenefitsInGrantResponseDto[];

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantPeriodInGrantResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantInsuredStatusInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty({ required: false })
  public involuntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public intentionToProveInvoluntaryUnemployment?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public ruralInsuredClient?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public documentsDescription?: string;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantInsuredStatusInGrantResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryInGrantResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryInGrantResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantWorkPeriodsInGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(TemporaryDisabilityBenefitsGrantCategoryEnum, {
    required: false,
  })
  public category?: TemporaryDisabilityBenefitsGrantCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum,
    { required: false },
  )
  public pendencyReason?: TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum;

  @ResponseDtoEnumProperty(
    TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoObjectProperty(
    () =>
      GetTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryInGrantResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryInGrantResponseDto[];

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantWorkPeriodsInGrantResponseDto.name;
}

@ResponseDto()
export class GetTemporaryDisabilityBenefitsGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(TemporaryDisabilityBenefitsGrantId)
  public temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;

  @ResponseDtoEnumProperty(TemporaryDisabilityBenefitsGrantCategoryEnum)
  public category: TemporaryDisabilityBenefitsGrantCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantCnisDocumentResponseDto,
    { required: false },
  )
  public cnisDocument?: GetTemporaryDisabilityBenefitsGrantCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantResultResponseDto,
    { required: false },
  )
  public temporaryDisabilityBenefitsGrantResult?: GetTemporaryDisabilityBenefitsGrantResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantPeriodInGrantResponseDto,
    { isArray: true, required: false },
  )
  public temporaryDisabilityBenefitsGrantPeriod?: GetTemporaryDisabilityBenefitsGrantPeriodInGrantResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantInsuredStatusInGrantResponseDto,
    { isArray: true, required: false },
  )
  public temporaryDisabilityBenefitsGrantInsuredStatus?: GetTemporaryDisabilityBenefitsGrantInsuredStatusInGrantResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantWorkPeriodsInGrantResponseDto,
    { isArray: true, required: false },
  )
  public temporaryDisabilityBenefitsGrantWorkPeriods?: GetTemporaryDisabilityBenefitsGrantWorkPeriodsInGrantResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetTemporaryDisabilityBenefitsGrantAnalysisToolClientResponseDto,
  )
  public analysisToolClient: GetTemporaryDisabilityBenefitsGrantAnalysisToolClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceeding?: string[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetTemporaryDisabilityBenefitsGrantResponseDto.name;
}
