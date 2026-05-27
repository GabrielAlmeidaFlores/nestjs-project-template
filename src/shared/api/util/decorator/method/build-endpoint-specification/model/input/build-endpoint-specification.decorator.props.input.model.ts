import type { CanActivate, Type } from '@nestjs/common';
import type { BuildEndpointHttpSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-http-specification.type';
import type { BuildEndpointSuccessResponseSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-success-response-specification.type';
import type { BuildEndpointThrottleSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-throttle-specification.type';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class BuildEndpointSpecificationDecoratorPropsInputModel {
  public summary: string;
  public deprecated?: boolean;
  public successResponse: BuildEndpointSuccessResponseSpecificationType;
  public http: BuildEndpointHttpSpecificationType;
  public throttle?: BuildEndpointThrottleSpecificationType;
  public guard?: Array<Type<CanActivate> | CanActivate>;
  public userLevel?: Array<UserLevelEnum>;
  public tag?: Array<string>;
  protected readonly _type =
    BuildEndpointSpecificationDecoratorPropsInputModel.name;
}

export type BuildEndpointSpecificationType =
  PublicPropertyType<BuildEndpointSpecificationDecoratorPropsInputModel>;
