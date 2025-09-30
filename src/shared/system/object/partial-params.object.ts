import { PartialType as SwaggerPartialType } from '@nestjs/swagger';

export type AbstractCtorType<T = unknown> = abstract new (
  ...args: unknown[]
) => T;

export function PartialParams<TBase extends AbstractCtorType>(
  Base: TBase,
): TBase {
  const PartialClass = SwaggerPartialType(
    Base as unknown as new (...args: unknown[]) => unknown,
  );

  const staticPropertyNames = Object.getOwnPropertyNames(Base);

  const propertiesToCopy = staticPropertyNames.filter(
    (name) => !['length', 'name', 'prototype', 'constructor'].includes(name),
  );

  for (const propName of propertiesToCopy) {
    const descriptor = Object.getOwnPropertyDescriptor(Base, propName);
    if (descriptor) {
      Object.defineProperty(PartialClass, propName, descriptor);
    }
  }

  return PartialClass as unknown as TBase;
}
