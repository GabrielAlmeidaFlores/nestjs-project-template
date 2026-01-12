import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { GenerativeIaPartType } from '@infra/generative-ia/type/generative-ia-part.type';

export type ToolHandlerType = (
  parameters: Record<string, unknown>,
) => Promise<unknown>;

export class GenerateResponseInputModel extends BaseBuildableDtoObject {
  public readonly prompt?: string;
  public readonly systemInstruction?: string;
  public readonly promptFiles?: GenerativeIaPartType[];
  public readonly responseJsonSchema?: unknown;
  public readonly conversationHistory?: Array<{
    role: string;
    content: string;
  }>;
  public readonly tools?: Array<{
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  }>;
  public readonly useResponseMimeTypeForTools?: boolean = true;
  public readonly toolHandlers?: Record<string, ToolHandlerType>;

  protected override readonly _type = GenerateResponseInputModel.name;
}
