import { Controller } from '@nestjs/common';

export function CustomerController(path: string): ClassDecorator {
  return Controller(`customer/${path}`);
}
