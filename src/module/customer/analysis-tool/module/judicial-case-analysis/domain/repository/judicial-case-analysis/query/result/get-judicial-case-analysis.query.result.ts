import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import type { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import type { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';

export class GetJudicialCaseAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: JudicialCaseAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly judicialCaseAnalysisResult: JudicialCaseAnalysisResultTypeormEntity | null;
  public readonly judicialCaseAnalysisDocument: JudicialCaseAnalysisDocumentTypeormEntity[];
  protected override readonly _type =
    GetJudicialCaseAnalysisQueryResult.name;
}

