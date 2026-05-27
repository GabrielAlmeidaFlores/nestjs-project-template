import { Body, HttpStatus, Param, RequestMethod } from '@nestjs/common';

import { CreateCommentRequestDto } from '@module/social/comment/dto/request/create-comment.request.dto';
import { CreateCommentResponseDto } from '@module/social/comment/dto/response/create-comment.response.dto';
import { DeleteCommentResponseDto } from '@module/social/comment/dto/response/delete-comment.response.dto';
import { CommentId } from '@module/social/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import { CreateCommentUseCase } from '@module/social/comment/use-case/create-comment.use-case';
import { DeleteCommentUseCase } from '@module/social/comment/use-case/delete-comment.use-case';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { GenericControllerRoute } from '@shared/api/util/decorator/class/controller-route/generic-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@GenericControllerRoute('post')
export class CommentController {
  protected readonly _type = CommentController.name;

  public constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Add a comment to a post',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: ':postId/comment',
      method: RequestMethod.POST,
      type: CreateCommentRequestDto,
    },
    tag: ['comment'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Comment created.',
      type: CreateCommentResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createComment(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('postId', new ParseValueObjectPipe(PostId))
    postId: PostId,
    @Body() dto: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    return await this.createCommentUseCase.execute(sessionData, postId, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Delete a comment',
    userLevel: [UserLevelEnum.USER, UserLevelEnum.ADMIN],
    http: {
      path: ':postId/comment/:commentId',
      method: RequestMethod.DELETE,
    },
    tag: ['comment'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Comment deleted.',
      type: DeleteCommentResponseDto,
    },
    guard: [AuthGuard],
  })
  public async deleteComment(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('postId', new ParseValueObjectPipe(PostId))
    _postId: PostId,
    @Param('commentId', new ParseValueObjectPipe(CommentId))
    commentId: CommentId,
  ): Promise<DeleteCommentResponseDto> {
    return await this.deleteCommentUseCase.execute(sessionData, commentId);
  }
}
