import { Module } from '@nestjs/common';

import { EventGateway } from '@lib/event/event.gateway';
import { EventService } from '@lib/event/event.service';
import { CommentCreatedEventListener } from '@lib/event/listener/comment-created.event.listener';
import { CommentDeletedEventListener } from '@lib/event/listener/comment-deleted.event.listener';
import { PostCreatedEventListener } from '@lib/event/listener/post-created.event.listener';
import { PostDeletedEventListener } from '@lib/event/listener/post-deleted.event.listener';
import { UserRegisteredEventListener } from '@lib/event/listener/user-registered.event.listener';

@Module({
  providers: [
    {
      provide: EventGateway,
      useClass: EventService,
    },
    EventService,
    UserRegisteredEventListener,
    PostCreatedEventListener,
    PostDeletedEventListener,
    CommentCreatedEventListener,
    CommentDeletedEventListener,
  ],
  exports: [EventGateway],
})
export class EventModule {
  protected readonly _type = EventModule.name;
}
