import type { GetRetirementPlanningRppsRemunerationCalculationQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration-calculation/query/result/get-retirement-planning-rpps-remuneration-calculation.query.result';
import type { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

export abstract class RetirementPlanningRppsRemunerationCalculationQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRppsId(
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<GetRetirementPlanningRppsRemunerationCalculationQueryResult | null>;
}
