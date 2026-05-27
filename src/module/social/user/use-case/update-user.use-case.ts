import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { UserQueryRepositoryGateway } from '@module/social/user/domain/repository/user/query/user.query.repository.gateway';
import { UserCommandRepositoryGateway } from '@module/social/user/domain/repository/user/command/user.command.repository.gateway';
import { UpdateUserRequestDto } from '@module/social/user/dto/request/update-user.request.dto';
import { UpdateUserResponseDto } from '@module/social/user/dto/response/update-user.response.dto';
import { UserNotFoundError } from '@module/social/user/error/user-not-found.error';
import { UserEntity } from '@module/social/user/domain/schema/entity/user/user.entity';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateUserUseCase {
  protected readonly _type = UpdateUserUseCase.name;

  public constructor(
    @Inject(UserQueryRepositoryGateway)
    private readonly userQueryRepositoryGateway: UserQueryRepositoryGateway,
    @Inject(UserCommandRepositoryGateway)
    private readonly userCommandRepositoryGateway: UserCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const user =
      await this.userQueryRepositoryGateway.findOneUserByAuthIdentityId(
        sessionData.authIdentityId,
      );

    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = new UserEntity({
      id: user.id,
      authIdentityId: user.authIdentityId,
      name: dto.name ?? user.name,
      username: user.username,
      bio: dto.bio ?? user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });

    const updateUser = this.userCommandRepositoryGateway.updateUser(
      user.id,
      updatedUser,
    );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(updateUser);

    await transaction.commit();

    return UpdateUserResponseDto.build({ userId: user.id });
  }
}
