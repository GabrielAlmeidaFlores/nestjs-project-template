import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { AnalysisToolRecordEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity.props.interface';
import type { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

export class AnalysisToolRecordEntity extends BaseEntity<AnalysisToolRecordId> {
  @Description('Código de identificação do registro da ferramenta de análise')
  public readonly code: AnalysisToolRecordCode;

  @Description('Tipo do registro da ferramenta de análise')
  public readonly type: AnalysisToolRecordTypeEnum;

  @Description(
    'Análise rápida do CNIS associada ao registro da ferramenta de análise',
  )
  public readonly cnisFastAnalysis: CnisFastAnalysisEntity | null;

  protected readonly _type = AnalysisToolRecordEntity.name;

  public constructor(props: AnalysisToolRecordEntityPropsInterface) {
    super(AnalysisToolRecordId, props);

    this.code = props.code;
    this.type = props.type;
    this.cnisFastAnalysis = props.cnisFastAnalysis ?? null;
  }
}
