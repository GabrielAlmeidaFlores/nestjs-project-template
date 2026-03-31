import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TutorialCommandRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/command/tutorial.command.repository.gateway';
import { TutorialQueryRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/query/tutorial.query.repository.gateway';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';
import { TutorialNotFoundError } from '@module/customer/tutorial/error/tutorial-not-found.error';

@Injectable()
export class DeleteTutorialUseCase {
  protected readonly _type = DeleteTutorialUseCase.name;

  public constructor(
    @Inject(TutorialQueryRepositoryGateway)
    private readonly tutorialQueryRepositoryGateway: TutorialQueryRepositoryGateway,
    @Inject(TutorialCommandRepositoryGateway)
    private readonly tutorialCommandRepositoryGateway: TutorialCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(tutorialId: TutorialId): Promise<void> {
    const existing =
      await this.tutorialQueryRepositoryGateway.findOneTutorialById(tutorialId);

    if (!existing) {
      throw new TutorialNotFoundError();
    }

    const deleteTutorial =
      this.tutorialCommandRepositoryGateway.deleteTutorial(tutorialId);

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(deleteTutorial);

    await transaction.commit();
  }
}
