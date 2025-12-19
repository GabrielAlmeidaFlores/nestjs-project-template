import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-special-time-type.enum';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import { RetirementPlanningRppsPeriodSpecialTimeEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity.props.interface';
import { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRppsPeriodSpecialTimeEntity extends BaseEntity<RetirementPlanningRppsPeriodSpecialTimeId> {
  @Description('Tipo de tempo especial')
  public readonly type: RetirementPlanningPeriodSpecialTimeTypeEnum;
  @Description('Data de início do tempo especial')
  public readonly startDate: Date;
  @Description('Data de término do tempo especial')
  public readonly endDate: Date;
  @Description('Período RPPS associado ao tempo especial')
  public readonly retirementPlanningRppsPeriod: RetirementPlanningRppsPeriodEntity | null;

  protected readonly _type = RetirementPlanningRppsPeriodSpecialTimeEntity.name;

  public constructor(
    props: RetirementPlanningRppsPeriodSpecialTimeEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsPeriodSpecialTimeId, props);
    this.type = props.type;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.retirementPlanningRppsPeriod =
      props.retirementPlanningRppsPeriod ?? null;
  }
}
