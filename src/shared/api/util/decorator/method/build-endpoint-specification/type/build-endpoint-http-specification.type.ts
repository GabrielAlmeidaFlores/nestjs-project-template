import type { RequestMethod, Type } from '@nestjs/common';

export type BuildEndpointHttpSpecificationType =
  | {
      method: RequestMethod.HEAD;
      path: string;
    }
  | {
      method: RequestMethod.GET;
      path: string;
    }
  | {
      method: RequestMethod.DELETE;
      path: string;
    }
  | {
      method: RequestMethod.POST;
      path: string;
      type?: Type<unknown>;
    }
  | {
      method: RequestMethod.PATCH;
      path: string;
      type?: Type<unknown>;
    }
  | {
      method: RequestMethod.PUT;
      path: string;
      type?: Type<unknown>;
    };
