import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';
import { EventGateway } from '@lib/event/event.gateway';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

@Injectable()
export class EventService implements EventGateway {
  protected readonly _type = EventService.name;

  public constructor(private eventEmitter: EventEmitter2) {}

  public emitUpdateLegalProceedingDataEvent(
    id: AnalysisToolClientLegalProceedingId,
  ): void {
    this.eventEmitter.emit(EventEnum.UPDATE_LEGAL_PROCEEDING_DATA, id);
  }
}
