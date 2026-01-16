import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { JudicialCaseAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/enum/judicial-case-analysis-document-type.enum';
import type { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';

export class GetJudicialCaseAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: JudicialCaseAnalysisDocumentId;
  public readonly document: string;
  public readonly type: JudicialCaseAnalysisDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetJudicialCaseAnalysisDocumentQueryResult.name;
}

