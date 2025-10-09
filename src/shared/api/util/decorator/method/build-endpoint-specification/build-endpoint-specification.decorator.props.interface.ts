import type { CanActivate, Type } from '@nestjs/common';
import type { BuildEndpointHttpSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-http-specification.type';
import type { BuildEndpointSuccessResponseSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-success-response-specification.type';
import type { BuildEndpointThrottleSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-throttle-specification.type';

export interface BuildEndpointSpecificationDecoratorPropsInterface {
  summary: string;
  deprecated?: boolean;
  successResponse: BuildEndpointSuccessResponseSpecificationType;
  http: BuildEndpointHttpSpecificationType;
  throttle?: BuildEndpointThrottleSpecificationType;
  guard?: Array<Type<CanActivate> | CanActivate>;
  tag?: Array<string>;
}
