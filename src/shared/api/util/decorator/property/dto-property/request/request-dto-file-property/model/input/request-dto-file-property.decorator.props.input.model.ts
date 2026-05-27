import { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

import type { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';

export class RequestDtoFilePropertyDecoratorPropsInputModel extends BaseDtoPropertyDecoratorPropsInputModel {
  public allowedMimeType?: Array<MimeTypeEnum>;
}
