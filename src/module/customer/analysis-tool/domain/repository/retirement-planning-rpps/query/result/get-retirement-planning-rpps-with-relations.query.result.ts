import { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';

import type { GetRetirementPlanningRppsInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-inss-benefit/query/result/get-retirement-planning-rpps-inss-benefit.query.result';
import type { GetRetirementPlanningRppsLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-legal-proceeding/query/result/get-retirement-planning-rpps-legal-proceeding.query.result';
import type { GetRetirementPlanningRppsPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/query/result/get-retirement-planning-rpps-period.query.result';
import type { GetRetirementPlanningRppsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/query/result/get-retirement-planning-rpps-period-document.query.result';
import type { GetRetirementPlanningRppsRemunerationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/query/result/get-retirement-planning-rpps-remuneration.query.result';
import type { GetRetirementPlanningRppsRemunerationCalculationQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/query/result/get-retirement-planning-rpps-remuneration-calculation.query.result';
import type { GetRetirementPlanningRppsResultQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-result/query/result/get-retirement-planning-rpps-result.query.result';

export class GetRetirementPlanningRppsWithRelationsQueryResult extends GetRetirementPlanningRppsQueryResult {
  public readonly retirementPlanningRppsResult: GetRetirementPlanningRppsResultQueryResult | null;
  public readonly retirementPlanningRppsRemunerationCalculation: GetRetirementPlanningRppsRemunerationCalculationQueryResult | null;
  public readonly retirementPlanningRppsInssBenefit: GetRetirementPlanningRppsInssBenefitQueryResult[];
  public readonly retirementPlanningRppsLegalProceeding: GetRetirementPlanningRppsLegalProceedingQueryResult[];
  public readonly ctcDocuments: GetRetirementPlanningRppsPeriodDocumentQueryResult[];
  public readonly remunerations: GetRetirementPlanningRppsRemunerationQueryResult[];
  public readonly periods: GetRetirementPlanningRppsPeriodQueryResult[];

  protected override readonly _type =
    GetRetirementPlanningRppsWithRelationsQueryResult.name;
}
