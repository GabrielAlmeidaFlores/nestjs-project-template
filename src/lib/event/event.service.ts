import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';
import { EventGateway } from '@lib/event/event.gateway';

import type { CommentCreatedEventPayload } from '@lib/event/model/payload/comment-created.event.payload';
import type { CommentDeletedEventPayload } from '@lib/event/model/payload/comment-deleted.event.payload';
import type { PostCreatedEventPayload } from '@lib/event/model/payload/post-created.event.payload';
import type { PostDeletedEventPayload } from '@lib/event/model/payload/post-deleted.event.payload';
import type { UserRegisteredEventPayload } from '@lib/event/model/payload/user-registered.event.payload';

@Injectable()
export class EventService implements EventGateway {
  protected readonly _type = EventService.name;

  public constructor(private readonly eventEmitter: EventEmitter2) {}

  public emitUserRegisteredEvent(payload: UserRegisteredEventPayload): void {
    this.eventEmitter.emit(EventEnum.USER_REGISTERED, payload);
  }

  public emitPostCreatedEvent(payload: PostCreatedEventPayload): void {
    this.eventEmitter.emit(EventEnum.POST_CREATED, payload);
  }

  public emitPostDeletedEvent(payload: PostDeletedEventPayload): void {
    this.eventEmitter.emit(EventEnum.POST_DELETED, payload);
  }

  public emitCommentCreatedEvent(payload: CommentCreatedEventPayload): void {
    this.eventEmitter.emit(EventEnum.COMMENT_CREATED, payload);
  }

  public emitCommentDeletedEvent(payload: CommentDeletedEventPayload): void {
    this.eventEmitter.emit(EventEnum.COMMENT_DELETED, payload);
  }
}
