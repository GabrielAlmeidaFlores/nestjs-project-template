import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';

export class ResponseConfigInputModel extends BaseBuildableObject {
  public readonly jsonSchema?: unknown;
  public readonly responseMimeType?: GenerativeIaResponseMimeTypeEnum;

  protected override readonly _type = ResponseConfigInputModel.name;
}
