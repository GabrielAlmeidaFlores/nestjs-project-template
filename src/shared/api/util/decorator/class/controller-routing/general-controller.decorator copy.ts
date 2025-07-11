import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function GeneralController(path: string): ClassDecorator {
  const controller = Controller(path);
  const apiTags = ApiTags(path);

  return applyDecorators(controller, apiTags);
}
