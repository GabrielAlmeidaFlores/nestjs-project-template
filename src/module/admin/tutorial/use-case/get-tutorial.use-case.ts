import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { GetAdminTutorialResponseDto } from '@module/admin/tutorial/dto/response/get-admin-tutorial.response.dto';
import { TutorialQueryRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/query/tutorial.query.repository.gateway';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';
import { TutorialNotFoundError } from '@module/customer/tutorial/error/tutorial-not-found.error';

@Injectable()
export class GetAdminTutorialUseCase {
  protected readonly _type = GetAdminTutorialUseCase.name;

  public constructor(
    @Inject(TutorialQueryRepositoryGateway)
    private readonly tutorialQueryRepositoryGateway: TutorialQueryRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    tutorialId: TutorialId,
  ): Promise<GetAdminTutorialResponseDto> {
    const tutorial =
      await this.tutorialQueryRepositoryGateway.findOneTutorialById(tutorialId);

    if (!tutorial) {
      throw new TutorialNotFoundError();
    }

    const imageUrl = await this.bucketGateway.getSignedUrl(tutorial.image);

    return GetAdminTutorialResponseDto.build({
      tutorialId: tutorial.tutorialId,
      name: tutorial.name,
      link: tutorial.link,
      functionality: tutorial.functionality,
      description: tutorial.description,
      imageUrl: imageUrl.toString(),
      createdAt: tutorial.createdAt,
      updatedAt: tutorial.updatedAt,
    });
  }
}
