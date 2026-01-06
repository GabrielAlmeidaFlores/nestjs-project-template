import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ConversationMessageEntityInterface } from '@module/ai/chat/domain/schema/entity/conversation-message/conversation-message.entity.props.interface';
import { ConversationMessageRoleTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import { ConversationMessageId } from '@module/ai/chat/domain/schema/entity/conversation-message/value-object/conversation-message-id/conversation-message-id.value-object';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class ConversationMessageEntity extends BaseEntity<ConversationMessageId> {
  @Description('Id do chat criado pelo usuario')
  public readonly conversation: ConversationEntity | null;

  @Description('Define sobre quem pertence essa mensagem')
  public readonly role: ConversationMessageRoleTypeEnum | null;

  @Description('Mensagem abordada na conversa')
  public readonly content: string | null;

  @Description('Data da mensagem enviada')
  public override readonly createdAt: Date;

  protected readonly _type = ConversationMessageEntity.name;

  public constructor(props: ConversationMessageEntityInterface) {
    super(ConversationMessageId, props);

    this.conversation = props.conversation ?? null;
    this.role = props.role ?? null;
    this.content = props.content ?? null;
    this.createdAt = props.createdAt;
  }
}
