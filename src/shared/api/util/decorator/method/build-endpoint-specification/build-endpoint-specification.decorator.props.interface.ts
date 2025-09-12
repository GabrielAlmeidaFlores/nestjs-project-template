import type { CanActivate, Type } from '@nestjs/common';
import type { BuildEndpointHttpSpecificationInterface } from '@shared/api/util/decorator/method/build-endpoint-specification/interface/build-endpoint-http-specification.interface';
import type { BuildEndpointThrottleSpecificationInterface } from '@shared/api/util/decorator/method/build-endpoint-specification/interface/build-endpoint-throttle-specification.interface';
import type { BuildEndpointSuccessResponseSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-success-response-specification.type';

export interface BuildEndpointSpecificationDecoratorPropsInterface {
  summary: string;
  secure: boolean;
  deprecated?: boolean;
  successResponse: BuildEndpointSuccessResponseSpecificationType;
  http: BuildEndpointHttpSpecificationInterface;
  throttle?: BuildEndpointThrottleSpecificationInterface;
  guard?: Array<Type<CanActivate> | CanActivate>;
}
