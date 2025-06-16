import type { BuildEndpointHttpSpecificationInterface } from '@shared/api/decorator/method/build-endpoint-specification/interface/build-endpoint-http-specification.interface';
import type { BuildEndpointSuccessResponseSpecificationType } from '@shared/api/decorator/method/build-endpoint-specification/type/build-endpoint-success-response-specification.type';

export interface BuildEndpointSpecificationDecoratorPropsInterface {
  summary: string;
  secure: boolean;
  deprecated?: boolean;
  successResponse: BuildEndpointSuccessResponseSpecificationType;
  http: BuildEndpointHttpSpecificationInterface;
}
