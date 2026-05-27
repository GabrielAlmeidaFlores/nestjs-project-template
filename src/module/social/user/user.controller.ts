import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { GetUserResponseDto } from '@module/social/user/dto/response/get-user.response.dto';
import { UpdateUserRequestDto } from '@module/social/user/dto/request/update-user.request.dto';
import { UpdateUserResponseDto } from '@module/social/user/dto/response/update-user.response.dto';
import { GetUserUseCase } from '@module/social/user/use-case/get-user.use-case';
import { UpdateUserUseCase } from '@module/social/user/use-case/update-user.use-case';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@GenericControllerRoute('user')
export class UserController {
  protected readonly _type = UserController.name;

  public constructor(
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Get user by ID',
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['user'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'User found.',
      type: GetUserResponseDto,
    },
  })
  public async getUser(
    @Param('id', new ParseValueObjectPipe(UserId))
    userId: UserId,
  ): Promise<GetUserResponseDto> {
    return await this.getUserUseCase.execute(userId);
  }

  @BuildEndpointSpecification({
    summary: 'Update current user profile',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: 'me',
      method: RequestMethod.PATCH,
      type: UpdateUserRequestDto,
    },
    tag: ['user'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'User profile updated.',
      type: UpdateUserResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateUser(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.updateUserUseCase.execute(sessionData, dto);
  }
}
