import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';
import type { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';

export interface RequestDtoFilePropertyDecoratorPropsInterface
  extends BaseDtoPropertyDecoratorPropsInterface {
  allowedMimeType?: Array<MimeTypeEnum>;
}
