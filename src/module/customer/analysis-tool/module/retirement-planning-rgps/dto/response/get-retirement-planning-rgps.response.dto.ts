import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsInssBenefitId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-benefit/value-object/retirement-planning-rgps-inss-benefit-id.value-object';
import { RetirementPlanningRgpsLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-legal-proceeding/value-object/retirement-planning-rgps-legal-proceeding-id.value-object';
import { GetRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-period.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRgpsInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsInssBenefitId)
  public id: RetirementPlanningRgpsInssBenefitId;

  @ResponseDtoStringProperty()
  public inssBenefitNumber: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPlanningRgpsInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRgpsLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsLegalProceedingId)
  public id: RetirementPlanningRgpsLegalProceedingId;

  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPlanningRgpsLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRgpsResultResponseDto extends BaseBuildableDtoObject {
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

  protected override readonly _type =
    GetRetirementPlanningRgpsResultResponseDto.name;
}

@ResponseDto()
export class GetRetirementPlanningRgpsResponse extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsId)
  public id: RetirementPlanningRgpsId;

  @ResponseDtoStringProperty({ required: false })
  public cnisDocument?: string;

  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRgpsInssBenefitResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public retirementPlanningRgpsBenefit?: GetRetirementPlanningRgpsInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(() => GetRetirementPlanningRgpsResultResponseDto, {
    required: false,
  })
  public retirementPlanningRgpsResult?: GetRetirementPlanningRgpsResultResponseDto;

  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRgpsLegalProceedingResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public retirementPlanningRgpsLegalProceeding?: GetRetirementPlanningRgpsLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(() => GetRetirementPlanningRgpsPeriodResponseDto, {
    isArray: true,
    required: false,
  })
  public retirementPlanningRgpsPeriod?: GetRetirementPlanningRgpsPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoDateProperty({ required: false })
  public deletedAt?: Date;

  protected override readonly _type = GetRetirementPlanningRgpsResponse.name;
}
