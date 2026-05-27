import { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

import type { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class RequestDtoFilePropertyDecoratorPropsInputModel extends BaseDtoPropertyDecoratorPropsInputModel {
  public allowedMimeType?: Array<MimeTypeEnum>;
  protected override readonly _type =
    RequestDtoFilePropertyDecoratorPropsInputModel.name;
}

export type RequestDtoFilePropertyInputType =
  PublicPropertyType<RequestDtoFilePropertyDecoratorPropsInputModel>;
