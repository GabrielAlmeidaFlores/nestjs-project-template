import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsSpecialPeriodEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.entity.props.interface';
import { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRgpsSpecialPeriodEntity extends BaseEntity<RetirementPlanningRgpsSpecialPeriodId> {
  @Description('Resposta da análise do período especial RGPS')
  public readonly response: string;

  @Description(
    'Planejamento de aposentadoria RGPS associado ao período especial',
  )
  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  protected readonly _type = RetirementPlanningRgpsSpecialPeriodEntity.name;

  public constructor(
    props: RetirementPlanningRgpsSpecialPeriodEntityPropsInterface,
  ) {
    super(RetirementPlanningRgpsSpecialPeriodId, props);
    this.response = props.response;
    this.retirementPlanningRgps = props.retirementPlanningRgps ?? null;
  }
}
