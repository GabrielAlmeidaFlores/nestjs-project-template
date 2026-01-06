import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import {
  ToolPermissionInterface,
  ConversationToolPolicyEntityPropsInterface,
} from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity.props.interface';
import { ChatPersonaTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { ConversationToolPolicyTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/enum/conversation-tool-policy-type.enum';
import { ConversationToolPolicyId } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class ConversationToolPolicyEntity extends BaseEntity<ConversationToolPolicyId> {
  @Description('ID do chat criado pelo usuário')
  public readonly conversation: ConversationEntity | null;

  @Description('Disponibilidade da ferramenta')
  public readonly toolsEnable: boolean | null;

  @Description('Permissões para execução da IA')
  public readonly toolPermission: ToolPermissionInterface[] | null;

  @Description('Modo de execução pré-definido')
  public readonly defaultExecutionMode: ConversationToolPolicyTypeEnum | null;

  @Description(
    'Data e hora da criação do registro da politica sobre uso das ferramentas',
  )
  public override readonly createdAt: Date;

  @Description(
    'Data e hora da atualização do registro da politica sobre uso das ferramentas',
  )
  public override readonly updatedAt: Date;

  public readonly persona: ChatPersonaTypeEnum | null;
  public readonly personaPrompt: string | null;

  protected readonly _type = ConversationToolPolicyEntity.name;

  public constructor(props: ConversationToolPolicyEntityPropsInterface) {
    super(ConversationToolPolicyId, props);

    this.conversation = props.conversation ?? null;
    this.toolsEnable = props.toolsEnable ?? null;
    this.toolPermission = props.toolPermission ?? null;
    this.defaultExecutionMode = props.defaultExecutionMode ?? null;

    this.persona = props.persona ?? null;
    this.personaPrompt = props.personaPrompt ?? null;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
