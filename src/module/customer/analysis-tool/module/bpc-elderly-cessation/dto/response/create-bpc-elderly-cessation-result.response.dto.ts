import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class BpcElderlyCessationApplicableRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly title: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly description?: string;

  @ResponseDtoStringProperty()
  public readonly status: string;

  protected override readonly _type =
    BpcElderlyCessationApplicableRuleResponseDto.name;
}

@ResponseDto()
export class BpcElderlyCessationBenefitSummaryResponseDto extends BaseBuildableDtoObject {
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
    BpcElderlyCessationBenefitSummaryResponseDto.name;
}

@ResponseDto()
export class CreateBpcElderlyCessationResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly analysisResult: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly analysisDetailedText?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly completeAnalysisDownloadHtml?: string;

  @ResponseDtoObjectProperty(
    () => BpcElderlyCessationApplicableRuleResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly applicableRules?: BpcElderlyCessationApplicableRuleResponseDto[];

  @ResponseDtoObjectProperty(
    () => BpcElderlyCessationBenefitSummaryResponseDto,
    {
      required: false,
      isArray: true,
    },
  )
  public readonly benefitSummaries?: BpcElderlyCessationBenefitSummaryResponseDto[];

  @ResponseDtoStringProperty({ required: false })
  public readonly diagnosis?: string;

  @ResponseDtoNumberProperty({ required: false })
  public readonly totalHouseholdIncome?: number;

  @ResponseDtoNumberProperty({ required: false })
  public readonly perCapitaIncome?: number;

  @ResponseDtoStringProperty({ required: false })
  public readonly legalRequirementsMet?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly perCapitaIncomeBelowQuarterMinimumWage?: string;

  @ResponseDtoStringProperty({ required: false })
  public readonly ageEqualOrAbove65Years?: string;

  protected override readonly _type =
    CreateBpcElderlyCessationResultResponseDto.name;
}
