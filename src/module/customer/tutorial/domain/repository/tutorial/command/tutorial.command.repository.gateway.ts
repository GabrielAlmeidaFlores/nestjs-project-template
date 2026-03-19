import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { TutorialEntity } from '@module/customer/tutorial/domain/schema/entity/tutorial/tutorial.entity';

export abstract class TutorialCommandRepositoryGateway {
  public abstract createTutorial(tutorial: TutorialEntity): TransactionType;
}
