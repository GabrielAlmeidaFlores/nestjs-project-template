import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { ConversationHistoryItemInputModel } from '@infra/generative-ia/model/input/conversation-history-item.input.model';
import type { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import type { ToolDefinitionInputModel } from '@infra/generative-ia/model/input/tool-definition.input.model';
import type { GenerativeIaPartType } from '@infra/generative-ia/type/generative-ia-part.type';
import type { ToolHandlerType } from '@infra/generative-ia/type/tool-handler.type';

export class GenerateResponseInputModel extends BaseBuildableDtoObject {
  public readonly prompt?: string;
  public readonly systemInstruction?: string;
  public readonly promptFiles?: GenerativeIaPartType[];
  public readonly responseConfig?: ResponseConfigInputModel;
  public readonly conversationHistory?: ConversationHistoryItemInputModel[];
  public readonly tools?: ToolDefinitionInputModel[];
  public readonly toolHandlers?: Record<string, ToolHandlerType>;

  protected override readonly _type = GenerateResponseInputModel.name;
}
