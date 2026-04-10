import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/result/get-survivor-pension-analysis-deceased-work-history-period.query.result';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway {
  public abstract findManyBySurvivorPensionAnalysisDeceasedWorkHistoryId(
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult[]>;

  public abstract findOneById(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult | null>;

  public abstract findOneByIdOrFail(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult>;
}
