import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import type { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

export class GetCnisFastAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: CnisFastAnalysisId;
  public readonly cnisDocument: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly cnisFastAnalysisResult: CnisFastAnalysisResultTypeormEntity | null;

  protected override readonly _type = GetCnisFastAnalysisQueryResult.name;
}
