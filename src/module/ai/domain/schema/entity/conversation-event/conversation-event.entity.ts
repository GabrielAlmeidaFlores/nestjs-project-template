import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ConversationEntity } from '@module/ai/domain/schema/entity/conversation/conversation.entity';
import {
  ConversationEventPayloadType,
  ConversationEventEntityPropsInterface,
} from '@module/ai/domain/schema/entity/conversation-event/conversation-event.entity.props.interface';
import { ConversationEventTypeEnum } from '@module/ai/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import { ConversationEventId } from '@module/ai/domain/schema/entity/conversation-event/value-object/conversation-event-id/conversation-event-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class ConversationEventEntity extends BaseEntity<ConversationEventId> {
  @Description('Id do chat criado pelo usu[ario')
  public readonly conversation: ConversationEntity | null;

  @Description('Responsavel pela chamada')
  public readonly type: ConversationEventTypeEnum | null;

  @Description('Nome da função utilizada')
  public readonly name: string | null;

  @Description('Registro da resposta da IA quanto da entrada do usuário')
  public readonly payload: ConversationEventPayloadType | null;

  @Description('Data e hora da criação do registro')
  public override readonly createdAt: Date;

  protected readonly _type = ConversationEventEntity.name;

  public constructor(props: ConversationEventEntityPropsInterface) {
    super(ConversationEventId, props);

    this.conversation = props.conversation ?? null;
    this.type = props.type ?? null;
    this.name = props.name ?? null;
    this.payload = props.payload ?? null;
    this.createdAt = props.createdAt;
  }
}
