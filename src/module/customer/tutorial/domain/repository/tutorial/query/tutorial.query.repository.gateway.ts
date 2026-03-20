import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetTutorialQueryResult } from '@module/customer/tutorial/domain/repository/tutorial/query/result/get-tutorial.query.result';
import type { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

export abstract class TutorialQueryRepositoryGateway {
  public abstract listTutorials(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetTutorialQueryResult>>;

  public abstract findOneTutorialById(
    id: TutorialId,
  ): Promise<GetTutorialQueryResult | null>;
}
