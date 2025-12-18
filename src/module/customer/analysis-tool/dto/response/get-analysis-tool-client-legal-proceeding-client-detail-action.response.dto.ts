import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class LegalProceedingItemDestinatarioResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public nome: string;

  @ResponseDtoStringProperty()
  public polo: string;

  @ResponseDtoStringProperty()
  public comunicacao_id: number;

  protected override readonly _type =
    LegalProceedingItemDestinatarioResponseDto.name;
}

@ResponseDto()
export class LegalProceedingItemAdvogadoDetailResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: number;

  @ResponseDtoStringProperty()
  public nome: string;

  @ResponseDtoStringProperty()
  public numero_oab: string;

  @ResponseDtoStringProperty()
  public uf_oab: string;

  protected override readonly _type =
    LegalProceedingItemAdvogadoDetailResponseDto.name;
}

@ResponseDto()
export class LegalProceedingItemAdvogadoResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: number;

  @ResponseDtoStringProperty()
  public comunicacao_id: number;

  @ResponseDtoStringProperty()
  public advogado_id: number;

  @ResponseDtoStringProperty()
  public created_at: string;

  @ResponseDtoStringProperty()
  public updated_at: string;

  @ResponseDtoObjectProperty(() => LegalProceedingItemAdvogadoDetailResponseDto)
  public advogado: LegalProceedingItemAdvogadoDetailResponseDto[];

  protected override readonly _type =
    LegalProceedingItemAdvogadoResponseDto.name;
}

@ResponseDto()
export class GetLegalProceedingItemActionResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public id: number;

  @ResponseDtoStringProperty()
  public data_disponibilizacao: string;

  @ResponseDtoStringProperty()
  public siglaTribunal: string;

  @ResponseDtoStringProperty()
  public tipoComunicacao: string;

  @ResponseDtoStringProperty()
  public nomeOrgao: string;

  @ResponseDtoStringProperty()
  public texto: string;

  @ResponseDtoStringProperty()
  public numero_processo: string;

  @ResponseDtoStringProperty()
  public meio: string;

  @ResponseDtoStringProperty()
  public link: string;

  @ResponseDtoStringProperty()
  public tipoDocumento: string;

  @ResponseDtoStringProperty()
  public nomeClasse: string;

  @ResponseDtoStringProperty()
  public codigoClasse: string;

  @ResponseDtoStringProperty()
  public numeroComunicacao: number;

  @ResponseDtoStringProperty()
  public ativo: boolean;

  @ResponseDtoStringProperty()
  public hash: string;

  @ResponseDtoStringProperty()
  public datadisponibilizacao: string;

  @ResponseDtoStringProperty()
  public meiocompleto: string;

  @ResponseDtoStringProperty()
  public numeroprocessocommascara: string;

  @ResponseDtoObjectProperty(() => LegalProceedingItemDestinatarioResponseDto)
  public destinatarios: LegalProceedingItemDestinatarioResponseDto[];

  @ResponseDtoObjectProperty(() => LegalProceedingItemAdvogadoResponseDto)
  public destinatarioadvogados: LegalProceedingItemAdvogadoResponseDto[];

  protected override readonly _type =
    GetLegalProceedingItemActionResponseDto.name;
}
