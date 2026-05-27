import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';

import type { PostDeletedEventPayload } from '@lib/event/model/payload/post-deleted.event.payload';

@Injectable()
export class PostDeletedEventListener {
  protected readonly _type = PostDeletedEventListener.name;

  private readonly logger = new Logger(PostDeletedEventListener.name);

  @OnEvent(EventEnum.POST_DELETED)
  public handle(payload: PostDeletedEventPayload): void {
    this.logger.log(
      `Post deleted event received for postId=${payload.postId.toString()}`,
    );
  }
}
