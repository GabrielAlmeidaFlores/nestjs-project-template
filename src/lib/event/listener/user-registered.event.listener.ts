import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EventEnum } from '@lib/event/enum/event.enum';

import type { UserRegisteredEventPayload } from '@lib/event/model/payload/user-registered.event.payload';

@Injectable()
export class UserRegisteredEventListener {
  protected readonly _type = UserRegisteredEventListener.name;

  private readonly logger = new Logger(UserRegisteredEventListener.name);

  @OnEvent(EventEnum.USER_REGISTERED)
  public handle(payload: UserRegisteredEventPayload): void {
    this.logger.log(
      `User registered event received for userId=${payload.userId.toString()}`,
    );
  }
}
