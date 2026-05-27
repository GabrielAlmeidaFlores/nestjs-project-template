import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';

import type { CommentCreatedEventPayload } from '@lib/event/model/payload/comment-created.event.payload';

@Injectable()
export class CommentCreatedEventListener {
  protected readonly _type = CommentCreatedEventListener.name;

  private readonly logger = new Logger(CommentCreatedEventListener.name);

  @OnEvent(EventEnum.COMMENT_CREATED)
  public handle(payload: CommentCreatedEventPayload): void {
    this.logger.log(
      `Comment created event received for commentId=${payload.commentId.toString()} postId=${payload.postId.toString()} authorId=${payload.authorId.toString()}`,
    );
  }
}
