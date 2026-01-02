import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import { RetirementPlanningRppsPeriodEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity.props.interface';
import { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class RetirementPlanningRppsPeriodEntity extends BaseEntity<RetirementPlanningRppsPeriodId> {
  @Description('Data de início do período RPPS')
  public readonly startDate: Date;
  @Description('Data de término do período RPPS')
  public readonly endDate: Date;
  @Description('Cargo ocupado durante o período RPPS')
  public readonly jobPosition: string;
  @Description('Informações sobre a carreira durante o período RPPS')
  public readonly career: string;
  @Description('Tipo de serviço durante o período RPPS')
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;
  @Description('Departamento associado ao período RPPS')
  public readonly department: string;
  @Description(
    'Análise de planejamento previdenciário RPPS associada ao período',
  )
  public readonly retirementPlanningRpps: RetirementPlanningRppsEntity;

  protected readonly _type = RetirementPlanningRppsPeriodEntity.name;

  public constructor(props: RetirementPlanningRppsPeriodEntityPropsInterface) {
    super(RetirementPlanningRppsPeriodId, props);
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.jobPosition = props.jobPosition;
    this.career = props.career;
    this.serviceType = props.serviceType;
    this.department = props.department;
    this.retirementPlanningRpps = props.retirementPlanningRpps;
  }
}
