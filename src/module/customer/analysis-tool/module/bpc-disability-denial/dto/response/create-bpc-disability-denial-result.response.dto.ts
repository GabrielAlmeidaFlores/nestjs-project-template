import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class BpcDisabilityDenialApplicableRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly title: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly description?: string;

  @ResponseDtoStringProperty()
  public readonly status: string;

  protected override readonly _type =
    BpcDisabilityDenialApplicableRuleResponseDto.name;
}

@ResponseDto()
export class BpcDisabilityDenialBenefitSummaryResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly benefitType: string;

  @ResponseDtoStringProperty()
  public readonly result: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly dib?: string;

  @ResponseDtoNumberProperty({ required: false })
  public readonly expectedMonthlyBenefit?: number;

  @ResponseDtoStringProperty({ required: false })
  public readonly detailedAnalysis?: string;

  protected override readonly _type =
    BpcDisabilityDenialBenefitSummaryResponseDto.name;
}

@ResponseDto()
export class CreateBpcDisabilityDenialResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly analysisResult: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly analysisDetailedText?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly completeAnalysisDownloadHtml?: string;

  @ResponseDtoObjectProperty(
    () => BpcDisabilityDenialApplicableRuleResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly applicableRules?: BpcDisabilityDenialApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => BpcDisabilityDenialBenefitSummaryResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly benefitSummaries?: BpcDisabilityDenialBenefitSummaryResponseDto[];

  protected override readonly _type =
    CreateBpcDisabilityDenialResultResponseDto.name;
}
