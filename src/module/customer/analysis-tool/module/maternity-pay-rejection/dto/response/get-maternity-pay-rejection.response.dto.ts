import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { MaternityPayRejectionCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-category.enum';
import { MaternityPayRejectionTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/enum/maternity-pay-rejection-triggering-event.enum';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/enum/maternity-pay-rejection-document-type.enum';
import { MaternityPayRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-job-type.enum';
import { MaternityPayRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/enum/maternity-pay-rejection-work-period-period-consideration.enum';
import { MaternityPayRejectionWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/enum/maternity-pay-rejection-work-period-document-type.enum';
import { MaternityPayRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/generic/maternity-pay-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { MaternityPayRejectionResultInterface } from '@module/customer/analysis-tool/module/maternity-pay-rejection/model/interface/maternity-pay-rejection-result.interface';

@ResponseDto()
export class GetMaternityPayRejectionAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
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
    GetMaternityPayRejectionAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayRejectionResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public maternityPayRejectionFirstAnalysis?: string;

  @ResponseDtoObjectProperty(() => MaternityPayRejectionFirstAnalysisModel, {
    required: false,
  })
  public maternityPayRejectionSecondAnalysis?: MaternityPayRejectionFirstAnalysisModel;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public maternityPayRejectionCompleteAnalysis?: MaternityPayRejectionResultInterface;

  @ResponseDtoStringProperty({ required: false })
  public maternityPayRejectionSimplifiedAnalysis?: string;

  protected override readonly _type =
    GetMaternityPayRejectionResultResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayRejectionDocumentInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64)
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(MaternityPayRejectionDocumentTypeEnum)
  public type: MaternityPayRejectionDocumentTypeEnum;

  protected override readonly _type =
    GetMaternityPayRejectionDocumentInResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayRejectionWorkPeriodDocumentInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Base64)
  public document: Base64;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(MaternityPayRejectionWorkPeriodDocumentTypeEnum)
  public type: MaternityPayRejectionWorkPeriodDocumentTypeEnum;

  protected override readonly _type =
    GetMaternityPayRejectionWorkPeriodDocumentInResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayRejectionWorkPeriodEarningsHistoryItemInResponseDto extends BaseBuildableDtoObject {
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
  public competenceBelowTheMinimum?: string;

  protected override readonly _type =
    GetMaternityPayRejectionWorkPeriodEarningsHistoryItemInResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayRejectionWorkPeriodInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public pendencyReason?: string;

  @ResponseDtoEnumProperty(
    MaternityPayRejectionWorkPeriodPeriodConsiderationEnum,
    { required: false },
  )
  public periodConsideration?: MaternityPayRejectionWorkPeriodPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public contributionAverage?: string;

  @ResponseDtoStringProperty({ required: false })
  public status?: string;

  @ResponseDtoStringProperty({ required: false })
  public gracePeriod?: string;

  @ResponseDtoEnumProperty(MaternityPayRejectionWorkPeriodJobTypeEnum, {
    required: false,
  })
  public jobType?: MaternityPayRejectionWorkPeriodJobTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public activityDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetMaternityPayRejectionWorkPeriodDocumentInResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetMaternityPayRejectionWorkPeriodDocumentInResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetMaternityPayRejectionWorkPeriodEarningsHistoryItemInResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetMaternityPayRejectionWorkPeriodEarningsHistoryItemInResponseDto[];

  protected override readonly _type =
    GetMaternityPayRejectionWorkPeriodInResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayRejectionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MaternityPayRejectionId)
  public maternityPayRejectionId: MaternityPayRejectionId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(MaternityPayRejectionTriggeringEventEnum, {
    required: false,
  })
  public triggeringEvent?: MaternityPayRejectionTriggeringEventEnum;

  @ResponseDtoDateProperty({ required: false })
  public triggeringEventDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public estimatedTriggeringEventDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public workAccidentOrSevereDesease?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public clientWasUnemployedOnBenefitOrDisabilityStartDate?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public clientWasRuralInsuredOnBenefitOrDisabilityStartDate?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public isCurrentlyUnemployed?: boolean;

  @ResponseDtoEnumProperty(MaternityPayRejectionCategoryEnum, {
    required: false,
  })
  public category?: MaternityPayRejectionCategoryEnum;

  @ResponseDtoStringProperty({ required: false })
  public thirdPartyDocumentRelationDescription?: string;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefits?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumbers?: string[];

  @ResponseDtoObjectProperty(
    () => GetMaternityPayRejectionDocumentInResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetMaternityPayRejectionDocumentInResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetMaternityPayRejectionWorkPeriodInResponseDto,
    { required: false, isArray: true },
  )
  public workPeriods?: GetMaternityPayRejectionWorkPeriodInResponseDto[];

  @ResponseDtoObjectProperty(() => GetMaternityPayRejectionResultResponseDto, {
    required: false,
  })
  public result?: GetMaternityPayRejectionResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetMaternityPayRejectionAnalysisToolClientResponseDto,
  )
  public client: GetMaternityPayRejectionAnalysisToolClientResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetMaternityPayRejectionResponseDto.name;
}
