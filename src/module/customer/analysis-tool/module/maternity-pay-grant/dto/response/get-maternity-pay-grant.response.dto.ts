import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { MaternityPayGrantTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-triggering-event.enum';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-consideration.enum';
import { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';
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
export class GetMaternityPayGrantInssBenefitResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public inssBenefitNumber: string;

  protected override readonly _type =
    GetMaternityPayGrantInssBenefitResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayGrantLegalProceedingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  protected override readonly _type =
    GetMaternityPayGrantLegalProceedingResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ required: false })
  public firstAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public simplifiedAnalysis?: string;

  @ResponseDtoStringProperty({ required: false })
  public completeAnalysisDownload?: string;

  protected override readonly _type =
    GetMaternityPayGrantResultResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayGrantCnisDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'Arquivo em Base64',
  })
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetMaternityPayGrantCnisDocumentResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayGrantPeriodEarningsHistoryResponseDto extends BaseBuildableDtoObject {
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
  public analysis?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  protected override readonly _type =
    GetMaternityPayGrantPeriodEarningsHistoryResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayGrantPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty({ required: false })
  public startDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public endDate?: Date;

  @ResponseDtoEnumProperty(MaternityPayGrantCategoryEnum, { required: false })
  public category?: MaternityPayGrantCategoryEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public isPendency?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public competenceBelowTheMinimum?: boolean;

  @ResponseDtoEnumProperty(MaternityPayGrantPeriodPendencyReasonEnum, {
    required: false,
  })
  public pendencyReason?: MaternityPayGrantPeriodPendencyReasonEnum;

  @ResponseDtoStringProperty({ required: false })
  public typeOfContribution?: string;

  @ResponseDtoBooleanProperty({ required: false })
  public status?: boolean;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public contributionAverage?: DecimalValue;

  @ResponseDtoEnumProperty(MaternityPayGrantPeriodConsiderationEnum, {
    required: false,
  })
  public periodConsideration?: MaternityPayGrantPeriodConsiderationEnum;

  @ResponseDtoStringProperty({ required: false })
  public bondOrigin?: string;

  @ResponseDtoStringProperty({ required: false })
  public impact?: string;

  @ResponseDtoNumberProperty({ required: false })
  public gracePeriod?: number;

  @ResponseDtoBooleanProperty({ required: false })
  public complementViaMyInss?: boolean;

  @ResponseDtoObjectProperty(
    () => GetMaternityPayGrantPeriodEarningsHistoryResponseDto,
    { required: false, isArray: true },
  )
  public earningsHistory?: GetMaternityPayGrantPeriodEarningsHistoryResponseDto[];

  protected override readonly _type =
    GetMaternityPayGrantPeriodResponseDto.name;
}

@ResponseDto()
export class GetMaternityPayGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MaternityPayGrantId)
  public id: MaternityPayGrantId;

  @ResponseDtoStringProperty({ required: false })
  public analysisName?: string;

  @ResponseDtoEnumProperty(MaternityPayGrantCategoryEnum, { required: false })
  public category?: MaternityPayGrantCategoryEnum;

  @ResponseDtoEnumProperty(MaternityPayGrantTriggeringEventEnum, {
    required: false,
  })
  public triggeringEvent?: MaternityPayGrantTriggeringEventEnum;

  @ResponseDtoDateProperty({ required: false })
  public triggeringEventDate?: Date;

  @ResponseDtoBooleanProperty({ required: false })
  public isCurrentlyUnemployed?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public isUnemployedAtTriggeringEventDate?: boolean;

  @ResponseDtoBooleanProperty({ required: false })
  public isRuralInsured?: boolean;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodStartDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public ruralPeriodEndDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public ruralPeriodDocumentDescription?: string;

  @ResponseDtoObjectProperty(
    () => GetMaternityPayGrantCnisDocumentResponseDto,
    {
      required: false,
    },
  )
  public cnisDocument?: GetMaternityPayGrantCnisDocumentResponseDto;

  @ResponseDtoObjectProperty(() => GetMaternityPayGrantResultResponseDto, {
    required: false,
  })
  public maternityPayGrantResult?: GetMaternityPayGrantResultResponseDto;

  @ResponseDtoObjectProperty(() => GetMaternityPayGrantInssBenefitResponseDto, {
    isArray: true,
    required: false,
  })
  public maternityPayGrantInssBenefit?: GetMaternityPayGrantInssBenefitResponseDto[];

  @ResponseDtoObjectProperty(
    () => GetMaternityPayGrantLegalProceedingResponseDto,
    {
      isArray: true,
      required: false,
    },
  )
  public maternityPayGrantLegalProceeding?: GetMaternityPayGrantLegalProceedingResponseDto[];

  @ResponseDtoObjectProperty(() => GetMaternityPayGrantPeriodResponseDto, {
    isArray: true,
    required: false,
  })
  public maternityPayGrantPeriod?: GetMaternityPayGrantPeriodResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetMaternityPayGrantResponseDto.name;
}
