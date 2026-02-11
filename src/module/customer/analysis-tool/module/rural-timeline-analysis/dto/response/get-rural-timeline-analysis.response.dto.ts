import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';
import { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';
import { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
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
export class GetRuralTimelineAnalysisClientResponseDto extends BaseBuildableDtoObject {
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
    GetRuralTimelineAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetRuralTimelineAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoNumberProperty({ required: false })
  public documentYear?: number;

  @ResponseDtoStringProperty({ required: false })
  public documentHolderType?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public selfOwned?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public probatoryPurpose?: string;

  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  @ResponseDtoEnumProperty(RuralTimelineAnalysisPeriodDocumentTypeEnum)
  public type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisPeriodResidenceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public city: string;

  @ResponseDtoEnumProperty(StateCodeEnum)
  public stateCode: StateCodeEnum;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public distanceToPropertyKm: DecimalValue;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodResidenceResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisPeriodPropertyResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public propertyName: string;

  @ResponseDtoStringProperty()
  public ownerName: string;

  @ResponseDtoStringProperty()
  public postalCode: string;

  @ResponseDtoEnumProperty(StateCodeEnum)
  public stateCode: StateCodeEnum;

  @ResponseDtoStringProperty()
  public city: string;

  @ResponseDtoStringProperty({ required: false })
  public neighborhood?: string;

  @ResponseDtoStringProperty()
  public street: string;

  @ResponseDtoStringProperty({ required: false })
  public streetNumber?: string;

  @ResponseDtoEnumProperty(RuralTimelineAnalysisPeriodLandOwnershipTypeEnum)
  public landOwnershipType: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodPropertyResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisPeriodEconomicAspectsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(RuralTimelineAnalysisPeriodEconomicAspectTypeEnum)
  public type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public content?: string;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodEconomicAspectsResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public federalDocument: string;

  @ResponseDtoEnumProperty(
    RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum,
  )
  public kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;

  @ResponseDtoBooleanProperty()
  public receivesRuralBenefit: boolean;

  @ResponseDtoStringProperty({ required: false })
  public benefitNumber?: string;

  @ResponseDtoStringProperty({ required: false })
  public cnisDocumentUrl?: string;

  @ResponseDtoStringProperty({ required: false })
  public cnisDocumentOriginalFileName?: string;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoEnumProperty(RuralTimelineAnalysisDocumentTypeEnum)
  public type: RuralTimelineAnalysisDocumentTypeEnum;

  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetRuralTimelineAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public contributionDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public contributionAmount: DecimalValue;

  protected override readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto.name;
}

@ResponseDto()
export class RuralTimelineAnalysisCnisContributionPeriodSummaryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public employmentRelationshipSource?: string;

  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoNumberProperty({ required: false })
  public qualifyingPeriod?: number;

  @ResponseDtoEnumProperty(
    RuralTimelineAnalysisCnisContributionPeriodStatusEnum,
    { required: false },
  )
  public status?: RuralTimelineAnalysisCnisContributionPeriodStatusEnum;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public averageContributionAmount?: DecimalValue;

  @ResponseDtoEnumProperty(ContributionAdjustmentIntentTypeEnum)
  public contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;

  @ResponseDtoBooleanProperty()
  public externalSupplementationIntent: boolean;

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto,
    { isArray: true, required: false },
  )
  public underMinimumPeriods?: GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto[];

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodSummaryResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: string;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoEnumProperty(RuralTimelineAnalysisPeriodWorkerTypeEnum)
  public workerType: RuralTimelineAnalysisPeriodWorkerTypeEnum;

  @ResponseDtoEnumProperty(RuralTimelineAnalysisPeriodWorkRegimeTypeEnum)
  public workRegimeType: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum;

  @ResponseDtoEnumProperty(ProductionDestinationEnum, { required: false })
  public productionDestination?: ProductionDestinationEnum;

  @ResponseDtoStringProperty({ required: false })
  public documentAnalysis?: string;

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisPeriodResidenceResponseDto,
    { required: false },
  )
  public residence?: GetRuralTimelineAnalysisPeriodResidenceResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisPeriodPropertyResponseDto,
    { required: false },
  )
  public property?: GetRuralTimelineAnalysisPeriodPropertyResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisPeriodDocumentResponseDto,
    { isArray: true, required: false },
  )
  public documents?: GetRuralTimelineAnalysisPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisPeriodEconomicAspectsResponseDto,
    { isArray: true, required: false },
  )
  public economicAspects?: GetRuralTimelineAnalysisPeriodEconomicAspectsResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto,
    { isArray: true, required: false },
  )
  public familyGroupMembers?: GetRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto[];

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodResponseDto.name;
}

@ResponseDto()
export class GetRuralTimelineAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RuralTimelineAnalysisId)
  public id: RuralTimelineAnalysisId;

  @ResponseDtoEnumProperty(RuralTimelineAnalysisWorkRegimeEnum)
  public workRegime: RuralTimelineAnalysisWorkRegimeEnum;

  @ResponseDtoStringProperty({ required: false })
  public ruralTimelineCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public ruralTimelineSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public ruralTimelinePeriodDocumentAnalysis?: string;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(() => GetRuralTimelineAnalysisClientResponseDto)
  public analysisToolClient: GetRuralTimelineAnalysisClientResponseDto;

  @ResponseDtoObjectProperty(() => GetRuralTimelineAnalysisPeriodResponseDto, {
    isArray: true,
    required: false,
  })
  public periods?: GetRuralTimelineAnalysisPeriodResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisDocumentResponseDto,
    { isArray: true, required: false },
  )
  public cnisDocuments?: GetRuralTimelineAnalysisDocumentResponseDto[];

  @ResponseDtoObjectProperty(
    () => RuralTimelineAnalysisCnisContributionPeriodSummaryResponseDto,
    { isArray: true, required: false },
  )
  public cnisContributionPeriods?: RuralTimelineAnalysisCnisContributionPeriodSummaryResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisResponsibleResponseDto,
  )
  public createdBy: GetRuralTimelineAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRuralTimelineAnalysisResponsibleResponseDto,
  )
  public updatedBy: GetRuralTimelineAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetRuralTimelineAnalysisResponseDto.name;
}
