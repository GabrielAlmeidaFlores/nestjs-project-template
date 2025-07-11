import type { RequestMethod } from '@nestjs/common';

export interface BuildEndpointHttpSpecificationInterface {
  method: RequestMethod;
  path: string;
}
