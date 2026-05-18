import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import type { CnisWorkPeriodsResponseModel } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/model/cnis-work-periods-response.model';

export abstract class CnisXRayAnalysisGateway {
  public abstract analyze(
    cnisModel: CnisModel,
    analysisToolClient: AnalysisToolClientEntity,
  ): CnisWorkPeriodsResponseModel;
}
