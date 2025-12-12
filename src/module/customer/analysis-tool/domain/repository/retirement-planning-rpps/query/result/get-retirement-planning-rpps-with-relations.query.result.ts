import { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';

import type { GetRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/query/result/get-retirement-planning-rpps-period.query.result';
import type { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import type { GetRetirementPlanningRppsResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/query/result/get-retirement-planning-rpps-result.query.result';

export class GetRetirementPlanningRppsWithRelationsQueryResult extends GetRetirementPlanningRppsQueryResult {
  public readonly retirementPlanningRppsResult: GetRetirementPlanningRppsResultQueryResult | null;
  public readonly remunerations: GetRetirementPlanningRppsRemunerationQueryResult[];
  public readonly periods: GetRetirementPlanningRppsPeriodQueryResult[];
  protected override readonly _type =
    GetRetirementPlanningRppsWithRelationsQueryResult.name;
}
