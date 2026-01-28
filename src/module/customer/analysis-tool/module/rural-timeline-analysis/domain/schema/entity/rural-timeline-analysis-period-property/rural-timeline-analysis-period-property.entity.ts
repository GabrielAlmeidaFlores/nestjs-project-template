import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import { RuralTimelineAnalysisPeriodPropertyEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity.props.interface';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RuralTimelineAnalysisPeriodPropertyEntity extends BaseEntity<RuralTimelineAnalysisPeriodPropertyId> {
  @Description('Nome da propriedade.')
  public readonly propertyName: string;

  @Description('Nome do proprietário.')
  public readonly ownerName: string;

  @Description('CEP da propriedade.')
  public readonly postalCode: string;

  @Description('Código do estado.')
  public readonly stateCode: StateCodeEnum;

  @Description('Cidade.')
  public readonly city: string;

  @Description('Bairro.')
  public readonly neighborhood: string;

  @Description('Rua.')
  public readonly street: string;

  @Description('Número da rua.')
  public readonly streetNumber: string;

  @Description('Tipo de posse da terra.')
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
