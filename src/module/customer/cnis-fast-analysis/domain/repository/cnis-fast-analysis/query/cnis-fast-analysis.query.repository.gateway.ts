import type { NotFoundError } from '@core/error/not-found.error';
import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import type { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class CnisFastAnalysisQueryRepositoryGateway {
  public abstract findOneByIdWithRelationsOrFail(
    id: CnisFastAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCnisFastAnalysisWithRelationsQueryResult>;
}
