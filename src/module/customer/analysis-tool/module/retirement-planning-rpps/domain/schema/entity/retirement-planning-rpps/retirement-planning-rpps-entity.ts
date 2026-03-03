import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRppsEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps.entity.props.interface';

export class RetirementPlanningRppsEntity extends BaseEntity<RetirementPlanningRppsId> {
  @Description('Data de início da carreira do cliente')
  public readonly careerStartDate: Date;

  @Description('Data de início do serviço público do cliente')
  public readonly publicServiceStartDate: Date;

  @Description('Resultado do planejamento de RPPS do cliente')
  public retirementPlanningRppsResult: RetirementPlanningRppsResultEntity | null;

  @Description('Cálculo de remuneração do planejamento de RPPS do cliente')
  public retirementPlanningRppsRemunerationCalculation: RetirementPlanningRppsRemunerationCalculationEntity | null;

  protected readonly _type = RetirementPlanningRppsEntity.name;

  public constructor(props: RetirementPlanningRppsEntityPropsInterface) {
    super(RetirementPlanningRppsId, props);
    this.careerStartDate = props.careerStartDate;
    this.publicServiceStartDate = props.publicServiceStartDate;
    this.retirementPlanningRppsResult =
      props.retirementPlanningRppsResult ?? null;
    this.retirementPlanningRppsRemunerationCalculation =
      props.retirementPlanningRppsRemunerationCalculation ?? null;
  }
}
