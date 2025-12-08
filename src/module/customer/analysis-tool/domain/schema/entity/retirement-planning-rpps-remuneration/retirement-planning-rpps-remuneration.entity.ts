import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningRppsRemunerationEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.entity.props.interface';
import { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRppsRemunerationEntity extends BaseEntity<RetirementPlanningRppsRemunerationId> {
  @Description('Data da remuneração RPPS')
  public readonly date: Date;
  @Description('Valor da remuneração RPPS')
  public readonly amount: number;
  @Description(
    'Análise de planejamento previdenciário RPPS associada à remuneração',
  )
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity;

  protected readonly _type = RetirementPlanningRppsRemunerationEntity.name;

  public constructor(
    props: RetirementPlanningRppsRemunerationEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsRemunerationId, props);
    this.date = props.date;
    this.amount = props.amount;
    this.retirementPlanningRpps = props.retirementPlanningRpps;
  }
}
