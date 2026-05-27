import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';
import type { TypeHelpOptions } from 'class-transformer';
import type { ValidationArguments } from 'class-validator';

interface ValueWrapperInterface {
  value: unknown;
}
interface FileLikeInterface {
  mimetype?: unknown;
  filename?: unknown;
  file?: unknown;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
function isJsonLike(v: unknown): v is Record<string, unknown> | unknown[] {
  return isRecord(v) || Array.isArray(v);
}
function isFileLike(v: unknown): v is FileLikeInterface {
  if (!isRecord(v)) {
    return false;
  }
  return (
    typeof v['mimetype'] === 'string' ||
    typeof v['filename'] === 'string' ||
    Object.prototype.hasOwnProperty.call(v, 'file')
  );
}
function isValueWrapper(v: unknown): v is ValueWrapperInterface {
  return (
    isRecord(v) &&
    Object.prototype.hasOwnProperty.call(v, 'value') &&
    !isFileLike(v)
  );
}

function looksJson(s: string): boolean {
  const t = s.trim();
  return (
    (t.startsWith('{') && t.endsWith('}')) ||
    (t.startsWith('[') && t.endsWith(']'))
  );
}
function unwrapValue(v: unknown): unknown {
  return isValueWrapper(v) ? v.value : v;
}
function tryParseJsonString(v: unknown): unknown {
  if (typeof v !== 'string') {
    return v;
  }
  if (!looksJson(v)) {
    return v;
  }
  try {
    return JSON.parse(v) as unknown;
  } catch {
    return v;
  }
}

function transformArrayJson(
  raw: unknown[],
  isArray: boolean,
  typeFn: () => Function,
): unknown[] {
  const parsedArray: unknown[] = raw.map((it) =>
    tryParseJsonString(unwrapValue(it)),
  );
  if (!isArray) {
    return parsedArray;
  }

  const Ctor = typeFn() as new (...args: unknown[]) => unknown;
  return parsedArray.map((item) =>
    isJsonLike(item)
      ? plainToInstance(Ctor, item, { enableImplicitConversion: true })
      : item,
  );
}

function buildJsonToObjectTransform(
  typeFn: () => Function,
  isArray: boolean,
): PropertyDecorator {
  return Transform(
    ({ value }): unknown => {
      if (typeof value === 'object') {
        return value;
      }

      const raw = unwrapValue(value);

      if (isFileLike(raw)) {
        return raw;
      }

      if (Array.isArray(raw)) {
        return transformArrayJson(raw, isArray, typeFn);
      }

      const parsed = tryParseJsonString(raw);
      if (isJsonLike(parsed)) {
        const Ctor = typeFn() as new (...args: unknown[]) => unknown;
        return plainToInstance(Ctor, parsed, {
          enableImplicitConversion: true,
        });
      }
      return parsed;
    },
    { toClassOnly: true },
  );
}

export function BaseDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoPropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const propertyIsRequired: boolean = (props?.required ?? true) === true;
  const isArray: boolean = props?.isArray === true;

  const baseDtoProperty = BaseDtoProperty(typeFunction(), props);

  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: typeFunction(),
    isArray,
    example: props?.example,
  });

  const jsonToObjectTransform = buildJsonToObjectTransform(
    typeFunction,
    isArray,
  );
  const objectType = Type(typeFunction);

  const validateNested = ValidateNested({
    each: isArray,
    message: (args: ValidationArguments) => {
      const functionName = typeFunction().name;
      const functionType = isArray ? `Array<${functionName}>` : functionName;
      return `o campo '${args.property}' não é compatível com o tipo ${functionType}`;
    },
  });

  const decorators = [
    baseDtoProperty,
    apiProperty,
    jsonToObjectTransform,
    objectType,
    validateNested,
  ];

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  } else {
    decorators.unshift(
      IsDefined({
        message: (args: ValidationArguments) => {
          return `o campo '${args.property}' é obrigatório`;
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
