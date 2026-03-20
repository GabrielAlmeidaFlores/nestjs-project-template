import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/value-object/general-urban-retirement-grant-inss-benefit-id.value-object';
import { GeneralUrbanRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/value-object/general-urban-retirement-grant-legal-proceeding-id.value-object';
import { GetGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-period.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementGrantInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementGrantInssBenefitId)
  public id: GeneralUrbanRetirementGrantInssBenefitId;

  @ResponseDtoStringProperty()
  public inssBenefitNumber: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementGrantLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementGrantLegalProceedingId)
  public id: GeneralUrbanRetirementGrantLegalProceedingId;

  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public clientName?: string;

  @ResponseDtoValueObjectProperty(FederalDocument, { required: false })
  public clientFederalDocument?: FederalDocument;

  @ResponseDtoDateProperty({ required: false })
  public clientBirthDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public clientLastAffiliationDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public compareCnisCtps?: string;

  @ResponseDtoStringProperty({ required: false })
  public compareCnisCtpsRaw?: string;

  @ResponseDtoStringProperty({ required: false })
  public generalUrbanRetirementGrantCompleteAnalysis?: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantResultResponseDto.name;
}

@ResponseDto()
export class GetGeneralUrbanRetirementGrantResponse extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementGrantId)
  public id: GeneralUrbanRetirementGrantId;

  @ResponseDtoStringProperty({ required: false })
  public cnisDocument?: string;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementGrantInssBenefitResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public generalUrbanRetirementGrantBenefit?: GetGeneralUrbanRetirementGrantInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementGrantResultResponseDto,
    {
      required: false,
    },
  )
  public generalUrbanRetirementGrantResult?: GetGeneralUrbanRetirementGrantResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementGrantLegalProceedingResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public generalUrbanRetirementGrantLegalProceeding?: GetGeneralUrbanRetirementGrantLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementGrantPeriodResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public generalUrbanRetirementGrantPeriod?: GetGeneralUrbanRetirementGrantPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoDateProperty({ required: false })
  public deletedAt?: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantResponse.name;
}
