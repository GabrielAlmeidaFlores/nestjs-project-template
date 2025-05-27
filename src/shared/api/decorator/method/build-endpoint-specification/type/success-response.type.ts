import type { HttpStatus, Type } from '@nestjs/common';

export type SuccessResponseType =
  | {
      statusCode: HttpStatus.OK;
      description: string;
      type: Type<unknown>;
    }
  | {
      statusCode: HttpStatus.CREATED;
      description: string;
      type: Type<unknown>;
    }
  | { statusCode: HttpStatus.NO_CONTENT; description: string };
