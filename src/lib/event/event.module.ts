import { Module } from '@nestjs/common';

import { EventGateway } from '@lib/event/event.gateway';
import { EventService } from '@lib/event/event.service';

@Module({
  providers: [
    {
      provide: EventGateway,
      useClass: EventService,
    },
    EventService,
  ],
  exports: [EventGateway],
})
export class EventModule {
  protected readonly _type = EventModule.name;
}
