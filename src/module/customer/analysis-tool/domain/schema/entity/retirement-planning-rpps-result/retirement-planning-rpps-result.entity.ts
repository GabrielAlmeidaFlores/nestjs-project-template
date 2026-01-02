import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/value-object/retirement-planning-rpps-result-id.value-object';

import type { RetirementPlanningRppsResultEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-result/retirement-planning-rpps-result.entity.props.interface';

export class RetirementPlanningRppsResultEntity extends BaseEntity<RetirementPlanningRppsResultId> {
  public readonly retirementPlanningRppsCompleteAnalysis: string | null;
  public readonly retirementPlanningRppsSimplifiedAnalysis: string | null;

  protected readonly _type = RetirementPlanningRppsResultEntity.name;

  public constructor(props: RetirementPlanningRppsResultEntityPropsInterface) {
    super(RetirementPlanningRppsResultId, props);

    this.retirementPlanningRppsCompleteAnalysis =
      props.retirementPlanningRppsCompleteAnalysis ?? null;
    this.retirementPlanningRppsSimplifiedAnalysis =
      props.retirementPlanningRppsSimplifiedAnalysis ?? null;
  }
}
