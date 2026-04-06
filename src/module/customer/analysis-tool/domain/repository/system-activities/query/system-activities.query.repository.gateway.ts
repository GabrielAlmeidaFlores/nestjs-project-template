import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetSystemActivityQueryResult } from '@module/customer/analysis-tool/domain/repository/system-activities/query/result/get-system-activity.query.result';
import type { ListSystemActivitiesQueryParamType } from '@module/customer/analysis-tool/domain/repository/system-activities/query/type/input/list-system-activities.query.param';

export abstract class SystemActivitiesQueryRepositoryGateway {
  public abstract listPaginated(
    param: ListSystemActivitiesQueryParamType,
  ): Promise<ListDataOutputModel<GetSystemActivityQueryResult>>;
}
