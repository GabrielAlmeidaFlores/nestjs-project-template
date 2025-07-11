import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function CustomerController(path: string): ClassDecorator {
  const controller = Controller(`customer/${path}`);
  const apiTags = ApiTags(`customer/${path}`);

  return applyDecorators(controller, apiTags);
}
