import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetDisabilityAssessmentForBpcAnalysisClientResponseDto extends BaseBuildableDtoObject {
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
    GetDisabilityAssessmentForBpcAnalysisClientResponseDto.name;
}

@ResponseDto()
export class GetDisabilityAssessmentForBpcAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public disabilityAssessmentForBpcCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public disabilityAssessmentForBpcSimplifiedAnalysis?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisResultResponseDto.name;
}

@ResponseDto()
export class GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public id: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto.name;
}

@ResponseDto()
export class GetDisabilityAssessmentForBpcAnalysisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisDocumentResponseDto.name;
}

@ResponseDto()
export class GetDisabilityAssessmentForBpcAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DisabilityAssessmentForBpcAnalysisId)
  public id: DisabilityAssessmentForBpcAnalysisId;

  @ResponseDtoDateProperty({ required: false })
  public estimatedDisabilityStartDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public attendsSchoolOrTechnicalCourse?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public performsLaborActivity?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public needsThirdPartyHelp?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public hasAccessToBasicServices?: boolean;

  @ResponseDtoStringProperty({ required: false })
  public otherBarriersDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetDisabilityAssessmentForBpcAnalysisDocumentResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public medicalAndSocialDocuments?:
    | GetDisabilityAssessmentForBpcAnalysisDocumentResponseDto[]
    | undefined;

  @ResponseDtoEnumProperty(AnalysisStatusEnum)
  public status: AnalysisStatusEnum;

  @ResponseDtoObjectProperty(
    () => GetDisabilityAssessmentForBpcAnalysisClientResponseDto,
  )
  public analysisToolClient: GetDisabilityAssessmentForBpcAnalysisClientResponseDto;

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public legalProceedingNumber?: string[];

  @ResponseDtoStringProperty({ required: false, isArray: true })
  public inssBenefitNumber?: string[];

  @ResponseDtoObjectProperty(
    () => GetDisabilityAssessmentForBpcAnalysisResultResponseDto,
    {
      required: false,
    },
  )
  public disabilityAssessmentForBpcAnalysisResult?: GetDisabilityAssessmentForBpcAnalysisResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto,
  )
  public createdBy: GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto;

  @ResponseDtoObjectProperty(
    () => GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto,
  )
  public updatedBy: GetDisabilityAssessmentForBpcAnalysisResponsibleResponseDto;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisResponseDto.name;
}
