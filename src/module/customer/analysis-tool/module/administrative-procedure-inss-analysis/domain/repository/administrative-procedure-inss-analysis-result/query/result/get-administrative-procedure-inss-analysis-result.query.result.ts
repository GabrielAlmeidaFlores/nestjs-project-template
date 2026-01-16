import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AdministrativeProcedureInssAnalysisResultId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-result/value-object/administrative-procedure-inss-analysis-result-id/administrative-procedure-inss-analysis-result-id.value-object';

export class GetAdministrativeProcedureInssAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: AdministrativeProcedureInssAnalysisResultId;
  public readonly administrativeProcedureInssCompleteAnalysis: string | null;
  public readonly administrativeProcedureInssSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisResultQueryResult.name;
}
