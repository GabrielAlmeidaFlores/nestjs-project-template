import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ConversationEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-event.typeorm.entity';
import { ConversationMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-message.typeorm.entity';
import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { ConversationStatusTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';

@Entity({ name: 'conversation' })
export class ConversationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'assistant_type',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  public assistantType?: string | null;

  @Column({
    name: 'status',
    type: 'simple-enum',
    enum: ConversationStatusTypeEnum,
    nullable: true,
  })
  public status?: ConversationStatusTypeEnum | null;

  @Column({ name: 'last_ai_message_at', type: 'datetime', nullable: true })
  public lastAIMessageAt?: Date | null;

  @Column({ name: 'archived_at', type: 'datetime', nullable: true })
  public archivedAt?: Date | null;

  @OneToMany(
    () => ConversationMessageTypeormEntity,
    (entity) => entity.conversation,
  )
  public conversationMessage?: ConversationMessageTypeormEntity[] | undefined;

  @OneToMany(
    () => ConversationEventTypeormEntity,
    (entity) => entity.conversation,
  )
  public conversationEvent?: ConversationEventTypeormEntity[] | undefined;

  @OneToOne(
    () => ConversationToolPolicyTypeormEntity,
    (entity) => entity.conversation,
  )
  public conversationToolPolicy?:
    | ConversationToolPolicyTypeormEntity
    | undefined;

  @ManyToOne(() => CustomerTypeormEntity, (entity) => entity.conversation, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  public customer?: CustomerTypeormEntity | undefined;

  protected override readonly _type = ConversationTypeormEntity.name;
}
