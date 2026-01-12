import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CnisFastAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity.props.interface';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

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
