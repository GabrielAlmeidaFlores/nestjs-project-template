import { customerEntityErrorMessage } from '@shared/system/constant/error-message/source/core/domain/entity/customer-entity.error-message';
import { valueObjectErrorMessage } from '@shared/system/constant/error-message/source/core/domain/value-object/value-object.error-message';

import type { ErrorMessageOutputModel } from '@shared/system/constant/error-message/model/output/error-message.output.model';

export const applicationErrorMessage: Record<string, ErrorMessageOutputModel> =
  {
    ...valueObjectErrorMessage,
    ...customerEntityErrorMessage,
  } as const;
