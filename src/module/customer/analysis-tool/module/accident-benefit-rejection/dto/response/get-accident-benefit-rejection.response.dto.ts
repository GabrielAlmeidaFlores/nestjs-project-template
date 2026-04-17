import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import { AccidentBenefitRejectionMainReasonEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-main-reason.enum';
import { AccidentBenefitRejectionRequestToExtendEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-request-to-extend.enum';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-document/enum/accident-benefit-rejection-document-type.enum';
import { AccidentBenefitRejectionEventDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/enum/accident-benefit-rejection-event-document-type.enum';
import { AccidentBenefitRejectionWorkPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-consideration.enum';
import { AccidentBenefitRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/enum/accident-benefit-rejection-work-period-job-type.enum';
import { AccidentBenefitRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/enum/accident-benefit-rejection-work-period-document-type.enum';
import { AccidentBenefitRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/generic/accident-benefit-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { AccidentBenefitRejectionResultInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/interface/accident-benefit-rejection-result.interface';

@ResponseDto()
export class GetAccidentBenefitRejectionAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
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
    GetAccidentBenefitRejectionAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => AccidentBenefitRejectionFirstAnalysisModel, {
    required: false,
  })
  public accidentBenefitRejectionFirstAnalysis?: AccidentBenefitRejectionFirstAnalysisModel;

  @ResponseDtoStringProperty({ required: false })
  public accidentBenefitRejectionSecondAnalysis?: string;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public accidentBenefitRejectionCompleteAnalysis?: AccidentBenefitRejectionResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public accidentBenefitRejectionSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public accidentBenefitRejectionCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetAccidentBenefitRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetAccidentBenefitRejectionCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionDocumentInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionDocumentTypeEnum)
  public type: AccidentBenefitRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetAccidentBenefitRejectionDocumentInResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionEventDocumentInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionEventDocumentTypeEnum)
  public type: AccidentBenefitRejectionEventDocumentTypeEnum;

  protected override readonly _type =
    GetAccidentBenefitRejectionEventDocumentInResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionEventInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public accidentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public accidentDescription?: string;

  @ResponseDtoStringProperty({ required: false })
  public cidTenId?: string;

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionEventDocumentInResponseDto,
    { required: false, isArray: true },
  )
  public eventDocuments?: GetAccidentBenefitRejectionEventDocumentInResponseDto[];

  protected override readonly _type =
    GetAccidentBenefitRejectionEventInResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionWorkPeriodDocumentInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public fileName: string;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionWorkPeriodDocumentTypeEnum)
  public type: AccidentBenefitRejectionWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    GetAccidentBenefitRejectionWorkPeriodDocumentInResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionWorkPeriodEarningsHistoryItemInResponseDto extends BaseBuildableDtoObject {
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
    GetAccidentBenefitRejectionWorkPeriodEarningsHistoryItemInResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionWorkPeriodInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: AccidentBenefitRejectionCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @ResponseDtoEnumProperty(
    AccidentBenefitRejectionWorkPeriodConsiderationEnum,
    {
      required: false,
    },
  )
  public periodConsideration?: AccidentBenefitRejectionWorkPeriodConsiderationEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionWorkPeriodJobTypeEnum, {
    required: false,
  })
  public jobType?: AccidentBenefitRejectionWorkPeriodJobTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionWorkPeriodDocumentInResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetAccidentBenefitRejectionWorkPeriodDocumentInResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionWorkPeriodEarningsHistoryItemInResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetAccidentBenefitRejectionWorkPeriodEarningsHistoryItemInResponseDto[];

  protected override readonly _type =
    GetAccidentBenefitRejectionWorkPeriodInResponseDto.name;
}

@ResponseDto()
export class GetAccidentBenefitRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentBenefitRejectionId)
  public accidentBenefitRejectionId: AccidentBenefitRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoDateProperty({ required: false })
  public requirementStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public rejectionDate?: Date;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionCategoryEnum, {
    required: false,
  })
  public category?: AccidentBenefitRejectionCategoryEnum;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionMainReasonEnum, {
    required: false,
  })
  public mainAccidentBenefitRejectionReason?: AccidentBenefitRejectionMainReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public otherAccidentBenefitRejectionReason?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public hasPreviousGrantRelated?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public previousGrantBenefitNumber?: string;

  @ResponseDtoDateProperty({ required: false })
  public previousGrantStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public previousGrantTerminationDate?: Date;

  @ResponseDtoEnumProperty(AccidentBenefitRejectionRequestToExtendEnum, {
    required: false,
  })
  public requestToExtendTemporaryDisabilityBenefit?: AccidentBenefitRejectionRequestToExtendEnum;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionDocumentInResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetAccidentBenefitRejectionDocumentInResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionEventInResponseDto,
    { required: false, isArray: true },
  )
  public events?: GetAccidentBenefitRejectionEventInResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionWorkPeriodInResponseDto,
    { required: false, isArray: true },
  )
  public workPeriods?: GetAccidentBenefitRejectionWorkPeriodInResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionResultResponseDto,
    { required: false },
  )
  public result?: GetAccidentBenefitRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAccidentBenefitRejectionAnalysisToolClientResponseDto,
    { required: false },
  )
  public client?: GetAccidentBenefitRejectionAnalysisToolClientResponseDto;

  protected override readonly _type =
    GetAccidentBenefitRejectionResponseDto.name;
}
