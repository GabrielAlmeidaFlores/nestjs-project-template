import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';

import type { CommentDeletedEventPayload } from '@lib/event/model/payload/comment-deleted.event.payload';

@Injectable()
export class CommentDeletedEventListener {
  protected readonly _type = CommentDeletedEventListener.name;

  private readonly logger = new Logger(CommentDeletedEventListener.name);

  @OnEvent(EventEnum.COMMENT_DELETED)
  public handle(payload: CommentDeletedEventPayload): void {
    this.logger.log(
      `Comment deleted event received for commentId=${payload.commentId.toString()} postId=${payload.postId.toString()}`,
    );
  }
}
