import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import { RuralTimelineAnalysisPeriodPropertyEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity.props.interface';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisPeriodPropertyEntity extends BaseEntity<RuralTimelineAnalysisPeriodPropertyId> {
  @Description(
    'Nome/identificação da propriedade rural onde a atividade foi exercida (ex: Fazenda São José, Sítio Santa Maria).',
  )
  public readonly propertyName: string | null;

  @Description('Nome completo do proprietário legal da terra.')
  public readonly ownerName: string | null;

  @Description('CEP (Código de Endereçamento Postal) da propriedade rural.')
  public readonly postalCode: PostalCode | null;

  @Description(
    'Sigla do estado (UF) onde a propriedade está localizada (ex: SP, MG, RS).',
  )
  public readonly stateCode: StateCodeEnum | null;

  @Description('Nome da cidade/município onde a propriedade está localizada.')
  public readonly city: string | null;

  @Description('Nome do bairro ou localidade rural da propriedade.')
  public readonly neighborhood: string | null;

  @Description('Nome da rua, estrada ou caminho de acesso à propriedade.')
  public readonly street: string | null;

  @Description(
    'Número ou identificação complementar do endereço da propriedade.',
  )
  public readonly streetNumber: string | null;

  @Description(
    'Tipo de posse da terra: Própria (proprietário), Familiar (de parente) ou Terceiro (arrendada/emprestada).',
  )
  public readonly landOwnershipType: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum | null;

  protected readonly _type = RuralTimelineAnalysisPeriodPropertyEntity.name;

  public constructor(
    props: RuralTimelineAnalysisPeriodPropertyEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisPeriodPropertyId, props);

    this.propertyName = props.propertyName ?? null;
    this.ownerName = props.ownerName ?? null;
    this.postalCode = props.postalCode ?? null;
    this.stateCode = props.stateCode ?? null;
    this.city = props.city ?? null;
    this.neighborhood = props.neighborhood ?? null;
    this.street = props.street ?? null;
    this.streetNumber = props.streetNumber ?? null;
    this.landOwnershipType = props.landOwnershipType ?? null;
  }
}
