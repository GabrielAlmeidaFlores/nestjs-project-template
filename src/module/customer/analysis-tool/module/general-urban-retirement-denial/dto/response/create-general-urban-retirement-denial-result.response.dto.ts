import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateGeneralUrbanRetirementDenialResultClientDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ example: 'Maria da Silva' })
  public name: string;

  @ResponseDtoStringProperty({ example: '123.456.789-00' })
  public federalDocument: string;

  @ResponseDtoDateProperty({ required: false, example: '2024-01-31T00:00:00.000Z' })
  public lastAffiliationDate?: Date;

  @ResponseDtoDateProperty({ required: false, example: '1988-05-10T00:00:00.000Z' })
  public birthDate?: Date;

  @ResponseDtoStringProperty({ example: 'Feminino' })
  public gender: string;

  protected override readonly _type =
    CreateGeneralUrbanRetirementDenialResultClientDataResponseDto.name;
}

@ResponseDto()
export class CreateGeneralUrbanRetirementDenialResultRetirementRuleResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({ example: 'Aposentadoria por idade urbana' })
  public retirementRuleName: string;

  @ResponseDtoBooleanProperty()
  public isEligible: boolean;

  @ResponseDtoDateProperty({ required: false, example: '2027-06-01T00:00:00.000Z' })
  public eligibilityAvailableAt?: Date;

  @ResponseDtoNumberProperty({ example: 3580.75 })
  public expectedMonthlyBenefit: number;

  @ResponseDtoBooleanProperty()
  public isBestRmi: boolean;

  @ResponseDtoBooleanProperty()
  public isHighestCauseValue: boolean;

  @ResponseDtoStringProperty({ example: 'Cumpre carência e tempo de contribuição para a regra analisada.' })
  public retirementAnalysis: string;

  protected override readonly _type =
    CreateGeneralUrbanRetirementDenialResultRetirementRuleResponseDto.name;
}

@ResponseDto()
export class CreateGeneralUrbanRetirementDenialResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CreateGeneralUrbanRetirementDenialResultClientDataResponseDto,
    { example: { name: 'Maria da Silva', federalDocument: '123.456.789-00', lastAffiliationDate: '2024-01-31T00:00:00.000Z', birthDate: '1988-05-10T00:00:00.000Z', gender: 'Feminino' } },
  )
  public clientData: CreateGeneralUrbanRetirementDenialResultClientDataResponseDto;

  @ResponseDtoObjectProperty(
    () => CreateGeneralUrbanRetirementDenialResultRetirementRuleResponseDto,
    {
      isArray: true,
      example: [
        {
          retirementRuleName: 'Aposentadoria por idade urbana',
          isEligible: true,
          eligibilityAvailableAt: '2027-06-01T00:00:00.000Z',
          expectedMonthlyBenefit: 3580.75,
          isBestRmi: true,
          isHighestCauseValue: false,
          retirementAnalysis:
            'Cumpre carência e tempo de contribuição para a regra analisada.',
        },
      ],
    },
  )
  public retirementRules: CreateGeneralUrbanRetirementDenialResultRetirementRuleResponseDto[];

  @ResponseDtoStringProperty({
    example:
      'Com base nos documentos analisados, há viabilidade para prosseguir com a tese administrativa e judicial.',
  })
  public analysisResult: string;

  protected override readonly _type =
    CreateGeneralUrbanRetirementDenialResultResponseDto.name;
}
