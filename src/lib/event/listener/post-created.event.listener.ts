import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';

import type { PostCreatedEventPayload } from '@lib/event/model/payload/post-created.event.payload';

@Injectable()
export class PostCreatedEventListener {
  protected readonly _type = PostCreatedEventListener.name;

  private readonly logger = new Logger(PostCreatedEventListener.name);

  @OnEvent(EventEnum.POST_CREATED)
  public handle(payload: PostCreatedEventPayload): void {
    this.logger.log(
      `Post created event received for postId=${payload.postId.toString()} authorId=${payload.authorId.toString()}`,
    );
  }
}
