import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { UpdateTutorialRequestDto } from '@module/admin/tutorial/dto/request/update-tutorial.request.dto';
import { CreateTutorialResponseDto } from '@module/admin/tutorial/dto/response/create-tutorial.response.dto';
import { TutorialCommandRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/command/tutorial.command.repository.gateway';
import { TutorialQueryRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/query/tutorial.query.repository.gateway';
import { TutorialEntity } from '@module/customer/tutorial/domain/schema/entity/tutorial/tutorial.entity';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';
import { TutorialNotFoundError } from '@module/customer/tutorial/error/tutorial-not-found.error';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class UpdateTutorialUseCase {
  protected readonly _type = UpdateTutorialUseCase.name;

  public constructor(
    @Inject(TutorialQueryRepositoryGateway)
    private readonly tutorialQueryRepositoryGateway: TutorialQueryRepositoryGateway,
    @Inject(TutorialCommandRepositoryGateway)
    private readonly tutorialCommandRepositoryGateway: TutorialCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    tutorialId: TutorialId,
    dto: UpdateTutorialRequestDto,
  ): Promise<CreateTutorialResponseDto> {
    const existing =
      await this.tutorialQueryRepositoryGateway.findOneTutorialById(tutorialId);

    if (!existing) {
      throw new TutorialNotFoundError();
    }

    const imageS3Key = dto.image
      ? await this.uploadImage(dto.image)
      : existing.image;

    const updated = new TutorialEntity({
      id: existing.tutorialId,
      name: dto.name ?? existing.name,
      link: dto.link ?? existing.link,
      functionality: dto.functionality ?? existing.functionality,
      description: dto.description ?? existing.description,
      image: imageS3Key,
    });

    const updateTutorial = this.tutorialCommandRepositoryGateway.updateTutorial(
      tutorialId,
      updated,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(updateTutorial);

    await transaction.commit();

    return CreateTutorialResponseDto.build({
      tutorialId: existing.tutorialId,
    });
  }

  private async uploadImage(image: Base64FileRequestDto): Promise<string> {
    const buffer = image.base64.decodeToBuffer();

    const fileModel = FileModel.build({
      buffer,
      originalName: image.originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });

    return this.bucketGateway.create(fileModel);
  }
}
