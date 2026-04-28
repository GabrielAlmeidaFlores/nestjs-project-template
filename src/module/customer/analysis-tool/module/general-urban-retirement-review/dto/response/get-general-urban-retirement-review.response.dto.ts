import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/value-object/general-urban-retirement-review-inss-benefit-id.value-object';
import { GeneralUrbanRetirementReviewLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/value-object/general-urban-retirement-review-legal-proceeding-id.value-object';
import { GetGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-period.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementReviewInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewInssBenefitId)
  public id: GeneralUrbanRetirementReviewInssBenefitId;

  @ResponseDtoStringProperty()
  public inssBenefitNumber: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementReviewLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewLegalProceedingId)
  public id: GeneralUrbanRetirementReviewLegalProceedingId;

  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementReviewResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public clientLastAffiliationDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public benefitAwardLetterAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public benefitAwardLetterAnalysisRaw?: string;

  @ResponseDtoStringProperty({ required: false })
  public firstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public compareCnisCtps?: string;

  @ResponseDtoStringProperty({ required: false })
  public compareCnisCtpsRaw?: string;

  @ResponseDtoStringProperty({ required: false })
  public generalUrbanRetirementReviewCompleteAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public generalUrbanRetirementReviewSimplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public generalUrbanRetirementReviewCompleteAnalysisDownload?: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewResultResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementReviewResponse extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewId)
  public id: GeneralUrbanRetirementReviewId;

  @ResponseDtoStringProperty({ required: false })
  public cnisDocument?: string;

  @ResponseDtoStringProperty({ required: false })
  public benefitAwardLetterDocument?: string;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoStringProperty({ required: false })
  public category?: string;

  @ResponseDtoStringProperty({ required: false })
  public myInssPassword?: string;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementReviewInssBenefitResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public generalUrbanRetirementReviewBenefit?: GetGeneralUrbanRetirementReviewInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementReviewResultResponseDto,
    {
      required: false,
    },
  )
  public generalUrbanRetirementReviewResult?: GetGeneralUrbanRetirementReviewResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementReviewLegalProceedingResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public generalUrbanRetirementReviewLegalProceeding?: GetGeneralUrbanRetirementReviewLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementReviewPeriodResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public generalUrbanRetirementReviewPeriod?: GetGeneralUrbanRetirementReviewPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoDateProperty({ required: false })
  public deletedAt?: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewResponse.name;
}
