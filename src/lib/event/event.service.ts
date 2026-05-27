import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';
import { EventGateway } from '@lib/event/event.gateway';

@Injectable()
export class EventService implements EventGateway {
  protected readonly _type = EventService.name;

  public constructor(private eventEmitter: EventEmitter2) {}

  public emitUpdateLegalProceedingDataEvent(id: string): void {
    this.eventEmitter.emit(EventEnum.UPDATE_LEGAL_PROCEEDING_DATA, id);
  }
}
