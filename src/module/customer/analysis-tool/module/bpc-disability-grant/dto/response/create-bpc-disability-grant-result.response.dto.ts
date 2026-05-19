import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class BpcDisabilityGrantRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly benefitType: string;

  @ResponseDtoBooleanProperty()
  public readonly result: boolean;

  @ResponseDtoDateProperty()
  public readonly benefitStartDate: Date;

  @ResponseDtoStringProperty()
  public readonly RMIprevista: string;

  @ResponseDtoStringProperty()
  public readonly detaildAnalysis: string;

  protected override readonly _type =
    BpcDisabilityGrantRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreateBpcDisabilityGrantResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly isElligibleForDisabilityBpc: boolean;

  @ResponseDtoStringProperty()
  public readonly totalFamiliarIncome: string;

  @ResponseDtoStringProperty()
  public readonly perCapitaIncome: string;

  @ResponseDtoBooleanProperty()
  public readonly lessThanOneQuarter: boolean;

  @ResponseDtoBooleanProperty()
  public readonly lessThanHalfAndAboveOneQuarter: boolean;

  @ResponseDtoBooleanProperty()
  public readonly disabilityProven: boolean;

  @ResponseDtoObjectProperty(
    () => BpcDisabilityGrantRetirementRuleResponseDto,
    {
      isArray: true,
    },
  )
  public readonly retirementRules: BpcDisabilityGrantRetirementRuleResponseDto[];

  @ResponseDtoStringProperty()
  public readonly analysisResult: string;

  protected override readonly _type =
    CreateBpcDisabilityGrantResultResponseDto.name;
}
