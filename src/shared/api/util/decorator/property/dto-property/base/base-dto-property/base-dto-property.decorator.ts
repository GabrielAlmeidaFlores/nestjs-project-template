import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { DTO_PROPS_SYMBOL } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/symbol/dto-props.symbol';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';
import type { DtoPropMetaType } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/type/dto-props-metadata.type';

import 'reflect-metadata';

function isDtoPropMeta(value: unknown): value is DtoPropMetaType {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;
  const hasType = Object.prototype.hasOwnProperty.call(obj, 'type');

  return (
    typeof obj['key'] === 'string' &&
    typeof obj['required'] === 'boolean' &&
    hasType
  );
}

export function isDtoPropMetaArray(x: unknown): x is DtoPropMetaType[] {
  return Array.isArray(x) && x.every((it) => isDtoPropMeta(it));
}

function createStoreMetadataDecorator(
  designType: unknown,
  propertyIsRequired: boolean,
): PropertyDecorator {
  return (target, propertyKey) => {
    const ctor = (target as object & { constructor: Function }).constructor;

    const raw: unknown = Reflect.getMetadata(DTO_PROPS_SYMBOL, ctor);
    const existing: DtoPropMetaType[] = isDtoPropMetaArray(raw) ? raw : [];

    const meta: DtoPropMetaType = {
      key: String(propertyKey),
      type: designType,
      required: propertyIsRequired,
    };

    const next: DtoPropMetaType[] = [
      ...existing.filter((p) => p.key !== meta.key),
      meta,
    ];

    Reflect.defineMetadata(DTO_PROPS_SYMBOL, next, ctor);
    Reflect.defineMetadata(
      `${DTO_PROPS_SYMBOL.description}:${String(propertyKey)}`,
      meta,
      ctor,
    );
  };
}

export function BaseDtoProperty(
  designType: unknown,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const isArray = props?.isArray === true;

  const storeMetadata = createStoreMetadataDecorator(
    designType,
    propertyIsRequired,
  );

  const apiPropertyConfig: Record<string, unknown> = {
    required: propertyIsRequired,
    example: props?.example,
    isArray,
  };

  if (props?.description !== undefined) {
    apiPropertyConfig['description'] = props.description;
  }

  const apiProperty = ApiProperty(apiPropertyConfig);

  const expose = Expose();

  return applyDecorators(storeMetadata, apiProperty, expose);
}
