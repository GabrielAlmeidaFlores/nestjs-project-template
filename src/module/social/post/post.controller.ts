import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { CreatePostRequestDto } from '@module/social/post/dto/request/create-post.request.dto';
import { UpdatePostRequestDto } from '@module/social/post/dto/request/update-post.request.dto';
import { CreatePostResponseDto } from '@module/social/post/dto/response/create-post.response.dto';
import { DeletePostResponseDto } from '@module/social/post/dto/response/delete-post.response.dto';
import { GetPostResponseDto } from '@module/social/post/dto/response/get-post.response.dto';
import { UpdatePostResponseDto } from '@module/social/post/dto/response/update-post.response.dto';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { CreatePostUseCase } from '@module/social/post/use-case/create-post.use-case';
import { DeletePostUseCase } from '@module/social/post/use-case/delete-post.use-case';
import { GetPostUseCase } from '@module/social/post/use-case/get-post.use-case';
import { UpdatePostUseCase } from '@module/social/post/use-case/update-post.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@GenericControllerRoute('post')
export class PostController {
  protected readonly _type = PostController.name;

  public constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getPostUseCase: GetPostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Create a new post',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreatePostRequestDto,
    },
    tag: ['post'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Post created.',
      type: CreatePostResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createPost(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    return await this.createPostUseCase.execute(sessionData, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Get post by ID',
    http: {
      path: ':id',
      method: RequestMethod.GET,
    },
    tag: ['post'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Post found.',
      type: GetPostResponseDto,
    },
  })
  public async getPost(
    @Param('id', new ParseValueObjectPipe(PostId))
    postId: PostId,
  ): Promise<GetPostResponseDto> {
    return await this.getPostUseCase.execute(postId);
  }

  @BuildEndpointSpecification({
    summary: 'Update a post',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: ':id',
      method: RequestMethod.PATCH,
      type: UpdatePostRequestDto,
    },
    tag: ['post'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Post updated.',
      type: UpdatePostResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updatePost(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('id', new ParseValueObjectPipe(PostId))
    postId: PostId,
    @Body() dto: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    return await this.updatePostUseCase.execute(sessionData, postId, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Delete a post',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: ':id',
      method: RequestMethod.DELETE,
    },
    tag: ['post'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Post deleted.',
      type: DeletePostResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deletePost(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('id', new ParseValueObjectPipe(PostId))
    postId: PostId,
  ): Promise<DeletePostResponseDto> {
    return await this.deletePostUseCase.execute(sessionData, postId);
  }
}
