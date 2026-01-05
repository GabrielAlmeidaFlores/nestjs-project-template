import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { GenerativeIaPartType } from '@infra/generative-ia/type/generative-ia-part.type';

export class GenerateResponseInputModel extends BaseBuildableDtoObject {
  public readonly prompt?: string;
  public readonly systemInstruction?: string;
  public readonly promptFiles?: GenerativeIaPartType[];
  public readonly responseJsonSchema?: unknown;

  protected override readonly _type = GenerateResponseInputModel.name;
}
