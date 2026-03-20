import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { GetTutorialQueryResult } from '@module/customer/tutorial/domain/repository/tutorial/query/result/get-tutorial.query.result';
import { TutorialQueryRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/query/tutorial.query.repository.gateway';
import { GetTutorialItemResponseDto } from '@module/customer/tutorial/dto/response/get-tutorial-item.response.dto';
import { ListTutorialsResponseDto } from '@module/customer/tutorial/dto/response/list-tutorials.response.dto';

@Injectable()
export class ListTutorialsUseCase {
  protected readonly _type = ListTutorialsUseCase.name;

  public constructor(
    @Inject(TutorialQueryRepositoryGateway)
    private readonly tutorialQueryRepositoryGateway: TutorialQueryRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListTutorialsResponseDto> {
    const result =
      await this.tutorialQueryRepositoryGateway.listTutorials(pagination);

    const items = await this.buildItems(result);

    return ListTutorialsResponseDto.build({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      amountItemsCurrentPage: result.amountItemsCurrentPage,
      resource: items,
    });
  }

  private async buildItems(
    result: ListDataOutputModel<GetTutorialQueryResult>,
  ): Promise<GetTutorialItemResponseDto[]> {
    return Promise.all(result.resource.map((item) => this.buildItem(item)));
  }

  private async buildItem(
    item: GetTutorialQueryResult,
  ): Promise<GetTutorialItemResponseDto> {
    const imageUrl = await this.bucketGateway.getSignedUrl(item.image);

    return GetTutorialItemResponseDto.build({
      tutorialId: item.tutorialId,
      name: item.name,
      link: item.link,
      functionality: item.functionality,
      description: item.description,
      imageUrl: imageUrl.toString(),
    });
  }
}
