import { Inject, Injectable } from '@nestjs/common';

import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { GetUserResponseDto } from '@module/client/user/dto/response/get-user.response.dto';
import { UserNotFoundError } from '@module/client/user/error/user-not-found.error';

@Injectable()
export class GetUserUseCase {
  protected readonly _type = GetUserUseCase.name;

  public constructor(
    @Inject(UserQueryRepositoryGateway)
    private readonly userQueryRepositoryGateway: UserQueryRepositoryGateway,
  ) {}

  public async execute(userId: UserId): Promise<GetUserResponseDto> {
    const user = await this.userQueryRepositoryGateway.findOneUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return GetUserResponseDto.build({
      userId: user.id,
      authIdentityId: user.authIdentityId,
      name: user.name,
      username: user.username,
      ...(user.bio !== null && { bio: user.bio }),
      createdAt: user.createdAt,
    });
  }
}
