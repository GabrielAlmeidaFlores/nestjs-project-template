import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import { RuralTimelineAnalysisPeriodPropertyEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity.props.interface';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisPeriodPropertyEntity extends BaseEntity<RuralTimelineAnalysisPeriodPropertyId> {
  @Description(
    'Nome/identificação da propriedade rural onde a atividade foi exercida (ex: Fazenda São José, Sítio Santa Maria).',
  )
  public readonly propertyName: string;

  @Description('Nome completo do proprietário legal da terra.')
  public readonly ownerName: string;

  @Description('CEP (Código de Endereçamento Postal) da propriedade rural.')
  public readonly postalCode: string;

  @Description(
    'Sigla do estado (UF) onde a propriedade está localizada (ex: SP, MG, RS).',
  )
  public readonly stateCode: StateCodeEnum;

  @Description('Nome da cidade/município onde a propriedade está localizada.')
  public readonly city: string;

  @Description('Nome do bairro ou localidade rural da propriedade.')
  public readonly neighborhood: string;

  @Description('Nome da rua, estrada ou caminho de acesso à propriedade.')
  public readonly street: string;

  @Description(
    'Número ou identificação complementar do endereço da propriedade.',
  )
  public readonly streetNumber: string;

  @Description(
    'Tipo de posse da terra: Própria (proprietário), Familiar (de parente) ou Terceiro (arrendada/emprestada).',
  )
  public readonly landOwnershipType: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum;

  protected readonly _type = RuralTimelineAnalysisPeriodPropertyEntity.name;

  public constructor(
    props: RuralTimelineAnalysisPeriodPropertyEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisPeriodPropertyId, props);

    this.propertyName = props.propertyName;
    this.ownerName = props.ownerName;
    this.postalCode = props.postalCode;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.street = props.street;
    this.streetNumber = props.streetNumber;
    this.landOwnershipType = props.landOwnershipType;
  }
}
