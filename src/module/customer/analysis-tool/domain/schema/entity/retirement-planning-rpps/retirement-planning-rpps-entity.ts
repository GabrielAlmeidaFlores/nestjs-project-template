import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRppsEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps.entity.props.interface';
import type { RetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity';

export class RetirementPlanningRppsEntity extends BaseEntity<RetirementPlanningRppsId> {
  @Description('CTC do cliente')
  public readonly ctcDocument: string;
  @Description('Data de início da carreira do cliente')
  public readonly careerStartDate: Date;
  @Description('Data de início do serviço público do cliente')
  public readonly publicServiceStartDate: Date;
  @Description('Resultado da análise de planejamento previdenciário RPPS')
  public readonly retirementPlanningRppsResult: RetirementPlanningRppsResultEntity;

  protected readonly _type = RetirementPlanningRppsEntity.name;

  public constructor(props: RetirementPlanningRppsEntityPropsInterface) {
    super(RetirementPlanningRppsId, props);
    this.ctcDocument = props.ctcDocument;
    this.careerStartDate = props.careerStartDate;
    this.publicServiceStartDate = props.publicServiceStartDate;
    this.retirementPlanningRppsResult = props.retirementPlanningRppsResult;
  }
}
