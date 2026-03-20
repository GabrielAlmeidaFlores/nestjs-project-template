import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { CreateTutorialRequestDto } from '@module/admin/tutorial/dto/request/create-tutorial.request.dto';
import { CreateTutorialResponseDto } from '@module/admin/tutorial/dto/response/create-tutorial.response.dto';
import { TutorialCommandRepositoryGateway } from '@module/customer/tutorial/domain/repository/tutorial/command/tutorial.command.repository.gateway';
import { TutorialEntity } from '@module/customer/tutorial/domain/schema/entity/tutorial/tutorial.entity';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateTutorialUseCase {
  protected readonly _type = CreateTutorialUseCase.name;

  public constructor(
    @Inject(TutorialCommandRepositoryGateway)
    private readonly tutorialCommandRepositoryGateway: TutorialCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async execute(
    dto: CreateTutorialRequestDto,
  ): Promise<CreateTutorialResponseDto> {
    const imageS3Key = await this.uploadImage(dto);

    const tutorial = new TutorialEntity({
      id: new TutorialId(),
      name: dto.name,
      link: dto.link,
      functionality: dto.functionality,
      description: dto.description,
      image: imageS3Key,
    });

    const createTutorial =
      this.tutorialCommandRepositoryGateway.createTutorial(tutorial);

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(createTutorial);

    await transaction.commit();

    return CreateTutorialResponseDto.build({
      tutorialId: tutorial.id,
    });
  }

  private async uploadImage(dto: CreateTutorialRequestDto): Promise<string> {
    const buffer = dto.image.base64.decodeToBuffer();

    const fileModel = FileModel.build({
      buffer,
      originalName: dto.image.originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });

    return this.bucketGateway.create(fileModel);
  }
}
