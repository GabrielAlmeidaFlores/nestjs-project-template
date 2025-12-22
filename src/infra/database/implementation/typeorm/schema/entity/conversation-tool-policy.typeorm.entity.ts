import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { ToolPermissionInterface } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity.props.interface';
import { ChatPersonaTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { ConversationToolPolicyTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/enum/conversation-tool-policy-type.enum';

@Entity({ name: 'conversation_tool_policy' })
export class ConversationToolPolicyTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'tools_enable',
    type: 'boolean',
    default: true,
    nullable: true,
  })
  public toolsEnable?: boolean | null;

  @Column({ name: 'tool_permission', type: 'json', nullable: true })
  public toolPermission?: ToolPermissionInterface[] | null;

  @Column({
    name: 'default_execution_mode',
    type: 'simple-enum',
    enum: ConversationToolPolicyTypeEnum,
    nullable: true,
  })
  public defaultExecutionMode?: ConversationToolPolicyTypeEnum | null;

  @Column({
    name: 'persona',
    type: 'simple-enum',
    enum: ChatPersonaTypeEnum,
    nullable: true,
  })
  public persona?: ChatPersonaTypeEnum | null;

  @Column({
    name: 'persona_prompt',
    type: 'text',
    nullable: true,
  })
  public personaPrompt?: string | null;

  @OneToOne(
    () => ConversationTypeormEntity,
    (entity) => entity.conversationToolPolicy,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'conversation_id' })
  public conversation: ConversationTypeormEntity;

  protected override readonly _type = ConversationToolPolicyTypeormEntity.name;
}
