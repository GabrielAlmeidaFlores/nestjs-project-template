import type { CommentCreatedEventPayload } from '@lib/event/model/payload/comment-created.event.payload';
import type { CommentDeletedEventPayload } from '@lib/event/model/payload/comment-deleted.event.payload';
import type { PostCreatedEventPayload } from '@lib/event/model/payload/post-created.event.payload';
import type { PostDeletedEventPayload } from '@lib/event/model/payload/post-deleted.event.payload';
import type { UserRegisteredEventPayload } from '@lib/event/model/payload/user-registered.event.payload';

export abstract class EventGateway {
  public abstract emitUserRegisteredEvent(
    payload: UserRegisteredEventPayload,
  ): void;

  public abstract emitPostCreatedEvent(payload: PostCreatedEventPayload): void;

  public abstract emitPostDeletedEvent(payload: PostDeletedEventPayload): void;

  public abstract emitCommentCreatedEvent(
    payload: CommentCreatedEventPayload,
  ): void;

  public abstract emitCommentDeletedEvent(
    payload: CommentDeletedEventPayload,
  ): void;
}
