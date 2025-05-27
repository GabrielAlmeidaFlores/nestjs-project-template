import { Controller } from '@nestjs/common';

export function ClientController(path: string): ClassDecorator {
  return Controller(`client/${path}`);
}
