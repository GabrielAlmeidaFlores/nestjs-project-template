import type { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';

export abstract class CnisAnalyzerGateway {
  public abstract analyzeCnisDocument(
    data: CnisModel,
    analysisToolClient: AnalysisToolClientEntity,
  ): Promise<CnisAnalysisResultModel>;
}
