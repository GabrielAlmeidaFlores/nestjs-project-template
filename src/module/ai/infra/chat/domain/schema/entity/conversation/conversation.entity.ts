import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { GetConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation/query/result/get-conversation.query.result';
import { ConversationEventEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/conversation-event.entity';
import { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import { ConversationToolPolicyEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity';
import { ConversationEntityPropsInterface } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity.props.interface';
import { ConversationStatusTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class ConversationEntity extends BaseEntity<ConversationId> {
  @Description('ID do usuário que abriu o chat')
  public readonly customerId: CustomerId | null;

  @Description('Persona que a IA vai se basear')
  public readonly assistantType: string | null;

  @Description('Título/assunto da conversa')
  public readonly title: string | null;

  @Description('Status sobre chat online ou desativado')
  public readonly status: ConversationStatusTypeEnum | null;

  @Description('Data da ultima resposta da IA')
  public readonly lastAIMessageAt: Date | null;

  @Description('Data da arquivação do chat por ausencia de uso')
  public readonly archivedAt: Date | null;

  @Description('Data da inicialização do chat')
  public override createdAt: Date;

  @Description('')
  public readonly conversationMessage: ConversationMessageEntity[] | null;

  @Description('')
  public readonly conversationEvent: ConversationEventEntity[] | null;

  @Description('')
  public readonly conversationToolPolicy: ConversationToolPolicyEntity | null;

  protected readonly _type = ConversationEntity.name;

  public constructor(props: ConversationEntityPropsInterface) {
    super(ConversationId, props);

    this.customerId = props.customerId ?? null;
    this.assistantType = props.assistantType ?? null;
    this.title = props.title ?? null;
    this.status = props.status ?? null;
    this.lastAIMessageAt = props.lastAIMessageAt ?? null;
    this.archivedAt = props.archivedAt ?? null;
    this.createdAt = props.createdAt;
    this.conversationMessage = props.conversationMessage ?? null;
    this.conversationEvent = props.conversationEvent ?? null;
    this.conversationToolPolicy = props.conversationToolPolicy ?? null;
  }

  public withLastAIMessageAt(date: Date): GetConversationQueryResult {
    return GetConversationQueryResult.build({
      id: this.id,
      title: this.title,
      assistantType: this.assistantType,
      status: this.status,
      lastAIMessageAt: date,
      archivedAt: this.archivedAt,
      createdAt: this.createdAt,
    });
  }
}
