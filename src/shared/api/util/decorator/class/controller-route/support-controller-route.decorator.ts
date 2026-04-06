import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function SupportControllerRoute(path: string): ClassDecorator {
  const controller = Controller(`support/${path}`);
  const apiTags = ApiTags(`support/${path}`);

  return applyDecorators(controller, apiTags);
}
