import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TutorialEntity } from '@module/customer/tutorial/domain/schema/entity/tutorial/tutorial.entity';
import type { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';

export abstract class TutorialCommandRepositoryGateway {
  public abstract createTutorial(tutorial: TutorialEntity): TransactionType;

  public abstract updateTutorial(
    id: TutorialId,
    tutorial: TutorialEntity,
  ): TransactionType;

  public abstract deleteTutorial(id: TutorialId): TransactionType;
}
