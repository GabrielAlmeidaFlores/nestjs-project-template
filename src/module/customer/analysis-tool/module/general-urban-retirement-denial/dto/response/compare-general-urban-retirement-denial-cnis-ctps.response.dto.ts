import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public tipo: string;

  @ResponseDtoStringProperty()
  public empresa: string;

  @ResponseDtoStringProperty()
  public periodoInicio: string;

  @ResponseDtoStringProperty()
  public periodoFim: string;

  @ResponseDtoStringProperty()
  public viabilidade: string;

  @ResponseDtoStringProperty()
  public reconhecimentoINSS: string;

  @ResponseDtoBooleanProperty()
  public impactoCarencia: boolean;

  @ResponseDtoStringProperty()
  public reconhecimentoJudicial: string;

  @ResponseDtoStringProperty()
  public tempoContribuicao: string;

  @ResponseDtoStringProperty()
  public observacaoTecnica: string;

  @ResponseDtoStringProperty()
  public contribuicaoMedia: string;

  @ResponseDtoBooleanProperty()
  public status: boolean;

  @ResponseDtoStringProperty()
  public tipoDeTrabalho: string;

  @ResponseDtoBooleanProperty()
  public competenciaAbaixoDoMinimo: boolean;

  @ResponseDtoStringProperty()
  public categoria: string;

  @ResponseDtoStringProperty()
  public carencia: string;

  protected override readonly _type =
    CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto.name;
}

@ResponseDto()
export class CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto,
    { isArray: true },
  )
  public periods: CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto[];

  protected override readonly _type =
    CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto.name;
}
