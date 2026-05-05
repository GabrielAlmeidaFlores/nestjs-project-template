import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class BpcDisabilityTerminationApplicableRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly title: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly description?: string;

  @ResponseDtoStringProperty()
  public readonly status: string;

  protected override readonly _type =
    BpcDisabilityTerminationApplicableRuleResponseDto.name;
}

@ResponseDto()
export class BpcDisabilityTerminationBenefitSummaryResponseDto extends BaseBuildableDtoObject {
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
    BpcDisabilityTerminationBenefitSummaryResponseDto.name;
}

@ResponseDto()
export class CreateBpcDisabilityTerminationResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly analysisResult: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly analysisDetailedText?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly completeAnalysisDownloadHtml?: string;

  @ResponseDtoObjectProperty(
    () => BpcDisabilityTerminationApplicableRuleResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly applicableRules?: BpcDisabilityTerminationApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => BpcDisabilityTerminationBenefitSummaryResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly benefitSummaries?: BpcDisabilityTerminationBenefitSummaryResponseDto[];

  protected override readonly _type =
    CreateBpcDisabilityTerminationResultResponseDto.name;
}
