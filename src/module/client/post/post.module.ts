import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CommentController } from '@module/client/comment/comment.controller';
import { CreateCommentUseCase } from '@module/client/comment/use-case/create-comment.use-case';
import { DeleteCommentUseCase } from '@module/client/comment/use-case/delete-comment.use-case';
import { PostController } from '@module/client/post/post.controller';
import { CreatePostUseCase } from '@module/client/post/use-case/create-post.use-case';
import { DeletePostUseCase } from '@module/client/post/use-case/delete-post.use-case';
import { GetPostUseCase } from '@module/client/post/use-case/get-post.use-case';
import { UpdatePostUseCase } from '@module/client/post/use-case/update-post.use-case';

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
