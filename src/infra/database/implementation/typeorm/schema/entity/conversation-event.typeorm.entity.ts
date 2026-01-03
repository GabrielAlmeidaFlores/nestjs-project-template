import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { ConversationEventPayloadType } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/conversation-event.entity.props.interface';
import { ConversationEventTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';

@Entity({ name: 'conversation_event' })
export class ConversationEventTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: ConversationEventTypeEnum,
  })
  public type: ConversationEventTypeEnum;

  @Column({ name: 'name', type: 'varchar', length: 120 })
  public name: string;

  @Column({ name: 'payload', type: 'json' })
  public payload: ConversationEventPayloadType;

  @ManyToOne(
    () => ConversationTypeormEntity,
    (entity) => entity.conversationEvent,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'conversation_id' })
  public conversation: ConversationTypeormEntity;

  protected override readonly _type = ConversationEventTypeormEntity.name;
}
