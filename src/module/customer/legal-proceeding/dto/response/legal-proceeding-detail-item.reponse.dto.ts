import { LegalProceedingDetailItemStatusEnum } from '@module/customer/legal-proceeding/domain/schema/enum/legal-proceeding-detail-item-status.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class LegalProceedingDetailItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public readonly id: number;

  @ResponseDtoStringProperty()
  public readonly data_disponibilizacao: string;

  @ResponseDtoStringProperty()
  public readonly siglaTribunal: string;

  @ResponseDtoStringProperty()
  public readonly tipoComunicacao: string;

  @ResponseDtoStringProperty()
  public readonly nomeOrgao: string;

  @ResponseDtoStringProperty()
  public readonly texto: string;

  @ResponseDtoStringProperty()
  public readonly numero_processo: string;

  @ResponseDtoStringProperty()
  public readonly meio: string;

  @ResponseDtoStringProperty()
  public readonly link: string;

  @ResponseDtoStringProperty()
  public readonly tipoDocumento: string;

  @ResponseDtoStringProperty()
  public readonly nomeClasse: string;

  @ResponseDtoStringProperty()
  public readonly codigoClasse: string;

  @ResponseDtoNumberProperty()
  public readonly numeroComunicacao: number;

  @ResponseDtoBooleanProperty()
  public readonly ativo: boolean;

  @ResponseDtoStringProperty()
  public readonly hash: string;

  @ResponseDtoEnumProperty(LegalProceedingDetailItemStatusEnum)
  public readonly status: LegalProceedingDetailItemStatusEnum;

  @ResponseDtoStringProperty()
  public readonly datadisponibilizacao: string;

  @ResponseDtoStringProperty()
  public readonly meiocompleto: string;

  @ResponseDtoStringProperty()
  public readonly numeroprocessocommascara: string;

  protected override readonly _type = LegalProceedingDetailItemResponseDto.name;
}

@ResponseDto()
export class LegalProceedingDetailDataItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public readonly status: string;

  @ResponseDtoStringProperty()
  public readonly message: string;

  @ResponseDtoNumberProperty()
  public readonly count: number;

  @ResponseDtoObjectProperty(() => LegalProceedingDetailItemResponseDto, {
    isArray: true,
  })
  public readonly items: LegalProceedingDetailItemResponseDto[];
  protected override readonly _type =
    LegalProceedingDetailDataItemResponseDto.name;
}

@ResponseDto()
export class LegalProceedingDetailDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public readonly ok: boolean;

  @ResponseDtoObjectProperty(() => LegalProceedingDetailDataItemResponseDto)
  public readonly data: LegalProceedingDetailDataItemResponseDto;
  protected override readonly _type = LegalProceedingDetailDataResponseDto.name;
}
