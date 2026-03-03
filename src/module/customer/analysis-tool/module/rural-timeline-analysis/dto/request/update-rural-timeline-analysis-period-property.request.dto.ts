import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRuralTimelineAnalysisPeriodPropertyRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({
    description:
      'Nome/identificação da propriedade rural onde a atividade foi exercida (ex: Fazenda São José, Sítio Santa Maria).',
    required: false,
  })
  public propertyName?: string;

  @RequestDtoStringProperty({
    description: 'Nome completo do proprietário legal da terra.',
    required: false,
  })
  public ownerName?: string;

  @RequestDtoValueObjectProperty(PostalCode, {
    description: 'CEP (Código de Endereçamento Postal) da propriedade rural.',
    required: false,
  })
  public postalCode?: PostalCode;

  @RequestDtoEnumProperty(StateCodeEnum, {
    description:
      'Sigla do estado (UF) onde a propriedade está localizada (ex: SP, MG, RS).',
    required: false,
  })
  public stateCode?: StateCodeEnum;

  @RequestDtoStringProperty({
    description: 'Nome da cidade/município onde a propriedade está localizada.',
    required: false,
  })
  public city?: string;

  @RequestDtoStringProperty({
    description: 'Nome do bairro ou localidade rural da propriedade.',
    required: false,
  })
  public neighborhood?: string;

  @RequestDtoStringProperty({
    description: 'Nome da rua, estrada ou caminho de acesso à propriedade.',
    required: false,
  })
  public street?: string;

  @RequestDtoStringProperty({
    description:
      'Número ou identificação complementar do endereço da propriedade.',
    required: false,
  })
  public streetNumber?: string;

  @RequestDtoEnumProperty(RuralTimelineAnalysisPeriodLandOwnershipTypeEnum, {
    description:
      'Tipo de posse da terra: Própria (proprietário), Familiar (de parente) ou Terceiro (arrendada/emprestada).',
    required: false,
  })
  public landOwnershipType?: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum;

  protected override readonly _type =
    UpdateRuralTimelineAnalysisPeriodPropertyRequestDto.name;
}
