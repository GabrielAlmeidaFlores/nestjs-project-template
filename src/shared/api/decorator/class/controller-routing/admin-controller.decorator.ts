import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function AdminController(path: string): ClassDecorator {
  const controller = Controller(`admin/${path}`);
  const apiTags = ApiTags(`admin/${path}`);

  return applyDecorators(controller, apiTags);
}
