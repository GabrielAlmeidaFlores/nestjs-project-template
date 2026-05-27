import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PostController } from '@module/social/post/post.controller';
import { CommentController } from '@module/social/comment/comment.controller';
import { CreatePostUseCase } from '@module/social/post/use-case/create-post.use-case';
import { GetPostUseCase } from '@module/social/post/use-case/get-post.use-case';
import { UpdatePostUseCase } from '@module/social/post/use-case/update-post.use-case';
import { DeletePostUseCase } from '@module/social/post/use-case/delete-post.use-case';
import { CreateCommentUseCase } from '@module/social/comment/use-case/create-comment.use-case';
import { DeleteCommentUseCase } from '@module/social/comment/use-case/delete-comment.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController, CommentController],
  providers: [
    CreatePostUseCase,
    GetPostUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
    CreateCommentUseCase,
    DeleteCommentUseCase,
  ],
})
export class PostModule {
  protected readonly _type = PostModule.name;
}
