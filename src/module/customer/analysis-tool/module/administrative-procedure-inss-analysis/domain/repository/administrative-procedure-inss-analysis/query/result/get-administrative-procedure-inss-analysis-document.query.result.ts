import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { AdministrativeProcedureInssAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/enum/administrative-procedure-inss-analysis-document-type.enum';

export class GetAdministrativeProcedureInssAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: Guid;
  public readonly document: string;
  public readonly type: AdministrativeProcedureInssAnalysisDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAdministrativeProcedureInssAnalysisDocumentQueryResult.name;
}
