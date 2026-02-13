import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-special-time-type.enum';
import { RetirementPlanningDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import { RetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-document/enum/retirement-planning-document-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAnalysisToolClientResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AnalysisToolClientId)
  public id: AnalysisToolClientId;

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

  protected override readonly _type = GetAnalysisToolClientResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRppsResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => Object, { required: false })
  public retirementPlanningRppsCompleteAnalysis?: object;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public retirementPlanningRppsSimplifiedAnalysis?: object;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPlanningRppsResultResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRppsPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(RetirementPlanningDocumentTypeEnum)
  public type: RetirementPlanningDocumentTypeEnum;

  @ResponseDtoValueObjectProperty(Base64, {
    description: 'Arquivo em Base64',
  })
  public document: Base64;

  @ResponseDtoStringProperty({
    description: 'Nome original do arquivo',
  })
  public originalFileName: string;

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodDocumentResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRppsCidResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CidTenId)
  public id: CidTenId;

  @ResponseDtoStringProperty()
  public code: string;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type =
    GetRetirementPlanningRppsCidResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRppsPeriodSpecialTimeResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(RetirementPlanningPeriodSpecialTimeTypeEnum)
  public type: RetirementPlanningPeriodSpecialTimeTypeEnum;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRppsPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRetirementPlanningRppsPeriodDocumentResponseDto[];

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodSpecialTimeResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRppsPeriodDisabilityResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(RetirementPlanningDisabilityTimeTypeEnum)
  public type: RetirementPlanningDisabilityTimeTypeEnum;

  @ResponseDtoEnumProperty(RetirementPlanningDisabilityDegreeEnum)
  public degree: RetirementPlanningDisabilityDegreeEnum;

  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoEnumProperty(RetirementPlanningDisabilityCategoryEnum)
  public category: RetirementPlanningDisabilityCategoryEnum;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoStringProperty()
  public dailyImpact: string;

  @ResponseDtoObjectProperty(() => GetRetirementPlanningRppsCidResponseDto)
  public cid: GetRetirementPlanningRppsCidResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRppsPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public documents?: GetRetirementPlanningRppsPeriodDocumentResponseDto[];

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodDisabilityResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRppsPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public startDate: Date;

  @ResponseDtoDateProperty()
  public endDate: Date;

  @ResponseDtoStringProperty()
  public jobPosition: string;

  @ResponseDtoStringProperty()
  public career: string;

  @ResponseDtoEnumProperty(RetirementPlanningPeriodServiceTypeEnum)
  public serviceType: RetirementPlanningPeriodServiceTypeEnum;

  @ResponseDtoStringProperty()
  public department: string;

  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRppsPeriodSpecialTimeResponseDto,
    { required: false },
  )
  public specialTimePeriod?: GetRetirementPlanningRppsPeriodSpecialTimeResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRppsPeriodDisabilityResponseDto,
    { required: false },
  )
  public disabilityPeriod?: GetRetirementPlanningRppsPeriodDisabilityResponseDto;

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRppsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRppsId)
  public id: RetirementPlanningRppsId;

  @ResponseDtoDateProperty()
  public careerStartDate: Date;

  @ResponseDtoDateProperty()
  public publicServiceStartDate: Date;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(() => GetAnalysisToolClientResponseDto, {
    required: false,
  })
  public analysisToolClient?: GetAnalysisToolClientResponseDto;

  @ResponseDtoObjectProperty(() => GetRetirementPlanningRppsResultResponseDto, {
    required: false,
  })
  public retirementPlanningRppsResult?: GetRetirementPlanningRppsResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRppsPeriodDocumentResponseDto,
    { required: false, isArray: true },
  )
  public ctcDocuments?: GetRetirementPlanningRppsPeriodDocumentResponseDto[];

  @ResponseDtoObjectProperty(() => GetRetirementPlanningRppsPeriodResponseDto, {
    required: false,
    isArray: true,
  })
  public periods?: GetRetirementPlanningRppsPeriodResponseDto[];

  protected override readonly _type = GetRetirementPlanningRppsResponseDto.name;
}
