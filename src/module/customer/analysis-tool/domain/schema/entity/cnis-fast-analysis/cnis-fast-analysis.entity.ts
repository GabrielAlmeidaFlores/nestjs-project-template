import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { CnisFastAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity.props.interface';
import type { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

export class CnisFastAnalysisEntity extends BaseEntity<CnisFastAnalysisId> {
  @Description('Documento CNIS utilizado na análise.')
  public readonly cnisDocument: string | null;

  @Description('Resultado da análise CNIS rápida.')
  public readonly cnisFastAnalysisResult: CnisFastAnalysisResultEntity | null;

  protected readonly _type = CnisFastAnalysisEntity.name;

  public constructor(props: CnisFastAnalysisEntityPropsInterface) {
    super(CnisFastAnalysisId, props);

    this.cnisDocument = props.cnisDocument ?? null;
    this.cnisFastAnalysisResult = props.cnisFastAnalysisResult ?? null;
  }
}
