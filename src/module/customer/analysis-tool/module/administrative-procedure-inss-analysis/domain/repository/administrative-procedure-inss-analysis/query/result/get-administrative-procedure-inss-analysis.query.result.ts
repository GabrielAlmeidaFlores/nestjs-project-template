import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import type { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import type { AdministrativeProcedureInssAnalysisId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis/value-object/administrative-procedure-inss-analysis-id/administrative-procedure-inss-analysis-id.value-object';

export class GetAdministrativeProcedureInssAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: AdministrativeProcedureInssAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly administrativeProcedureInssAnalysisResult: AdministrativeProcedureInssAnalysisResultTypeormEntity | null;
  public readonly administrativeProcedureInssAnalysisDocument: AdministrativeProcedureInssAnalysisDocumentTypeormEntity[];
  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisQueryResult.name;
}
