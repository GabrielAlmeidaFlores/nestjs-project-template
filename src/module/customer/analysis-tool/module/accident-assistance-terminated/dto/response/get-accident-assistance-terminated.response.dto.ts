import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AccidentAssistanceTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-category.enum';
import { AccidentAssistanceTerminatedExtensionRequestStatusEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-extension-request-status.enum';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedPeriodReasonPendencyEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/enum/accident-assistance-terminated-period-reason-pendency.enum';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import { AccidentAssistanceTerminatedFirstAnalysisModel } from '@module/customer/analysis-tool/module/accident-assistance-terminated/model/generic/accident-assistance-terminated-first-analysis.model';
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
export class GetAccidentAssistanceTerminatedClientResponseDto extends BaseBuildableDtoObject {
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
    GetAccidentAssistanceTerminatedClientResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceTerminatedResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoStringProperty({ required: false })
  public accidentAssistanceTerminatedCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public accidentAssistanceTerminatedSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public decisionDetails?: string;

  @ResponseDtoObjectProperty(
    () => AccidentAssistanceTerminatedFirstAnalysisModel,
    { required: false },
  )
  public firstAnalysis?: AccidentAssistanceTerminatedFirstAnalysisModel;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedResultResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceTerminatedPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentAssistanceTerminatedPeriodId)
  public accidentAssistanceTerminatedPeriodId: AccidentAssistanceTerminatedPeriodId;

  @ResponseDtoNumberProperty({ required: false })
  public sequencial?: number;

  @ResponseDtoStringProperty({ required: false })
  public periodName?: string;

  @ResponseDtoDateProperty({ required: false })
  public periodStart?: Date;

  @ResponseDtoDateProperty({ required: false })
  public periodEnd?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoEnumProperty(
    AccidentAssistanceTerminatedPeriodReasonPendencyEnum,
    { required: false },
  )
  public reasonPendency?: AccidentAssistanceTerminatedPeriodReasonPendencyEnum;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedPeriodResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceTerminatedResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedResponsibleResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceTerminatedDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedDocumentResponseDto.name;
}

@ResponseDto()
export class GetAccidentAssistanceTerminatedResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentAssistanceTerminatedId)
  public id: AccidentAssistanceTerminatedId;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceTerminatedDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public documents?:
    | GetAccidentAssistanceTerminatedDocumentResponseDto[]
    | undefined;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceTerminatedClientResponseDto,
  )
  public analysisToolClient: GetAccidentAssistanceTerminatedClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoDateProperty({ required: false })
  public der?: Date;

  @ResponseDtoDateProperty({ required: false })
  public denialDate?: Date;

  @ResponseDtoEnumProperty(AccidentAssistanceTerminatedCategoryEnum, {
    required: false,
  })
  public category?: AccidentAssistanceTerminatedCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public inssPassword?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoStringProperty({ required: false })
  public benefitCessationReason?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public hadPreviousIncapacityBenefit?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public previousIncapacityBenefitNumber?: string;

  @ResponseDtoDateProperty({ required: false })
  public previousIncapacityBenefitStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public previousIncapacityBenefitEndDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public dib?: Date;

  @ResponseDtoDateProperty({ required: false })
  public dcb?: Date;

  @ResponseDtoStringProperty({ required: false })
  public mainInssBenefitNumber?: string;

  @ResponseDtoDateProperty({ required: false })
  public accidentDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public accidentDescription?: string;

  @ResponseDtoEnumProperty(
    AccidentAssistanceTerminatedExtensionRequestStatusEnum,
    {
      required: false,
    },
  )
  public extensionRequestStatus?: AccidentAssistanceTerminatedExtensionRequestStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceTerminatedResultResponseDto,
    {
      required: false,
    },
  )
  public accidentAssistanceTerminatedResult?: GetAccidentAssistanceTerminatedResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceTerminatedPeriodResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public accidentAssistanceTerminatedPeriod?: GetAccidentAssistanceTerminatedPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceTerminatedResponsibleResponseDto,
  )
  public createdBy: GetAccidentAssistanceTerminatedResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetAccidentAssistanceTerminatedResponsibleResponseDto,
  )
  public updatedBy: GetAccidentAssistanceTerminatedResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetAccidentAssistanceTerminatedResponseDto.name;
}
