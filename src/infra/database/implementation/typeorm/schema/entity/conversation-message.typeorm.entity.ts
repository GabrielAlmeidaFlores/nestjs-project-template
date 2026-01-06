import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { ConversationMessageRoleTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';

@Entity({ name: 'conversation_message' })
export class ConversationMessageTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'role',
    type: 'simple-enum',
    enum: ConversationMessageRoleTypeEnum,
    nullable: true,
  })
  public role?: ConversationMessageRoleTypeEnum | null;

  @Column({ name: 'content', type: 'text', nullable: true })
  public content?: string | null;

  @ManyToOne(
    () => ConversationTypeormEntity,
    (entity) => entity.conversationMessage,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'conversation_id' })
  public conversation: ConversationTypeormEntity;

  protected override readonly _type = ConversationMessageTypeormEntity.name;
}
