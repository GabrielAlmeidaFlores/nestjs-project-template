import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { GetTutorialQueryResult } from '@module/customer/tutorial/domain/repository/tutorial/query/result/get-tutorial.query.result';

export abstract class TutorialQueryRepositoryGateway {
  public abstract listTutorials(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetTutorialQueryResult>>;
}
