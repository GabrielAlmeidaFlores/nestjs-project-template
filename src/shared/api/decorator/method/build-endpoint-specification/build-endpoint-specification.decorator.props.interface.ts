import type { SuccessResponseType } from '@shared/api/decorator/method/build-endpoint-specification/type/success-response.type';

export interface BuildEndpointSpecificationDecoratorPropsInterface {
  summary: string;
  secure: boolean;
  deprecated?: boolean;
  successResponse: SuccessResponseType;
}
