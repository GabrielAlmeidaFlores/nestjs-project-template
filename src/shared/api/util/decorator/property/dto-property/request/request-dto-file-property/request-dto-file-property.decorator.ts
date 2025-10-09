import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, type ValidationArguments } from 'class-validator';
import { IsFile, HasMimeType, IsFiles } from 'nestjs-form-data';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { RequestDtoFilePropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator.props.interface';

export function RequestDtoFileProperty(
  props: RequestDtoFilePropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props.required ?? true;

  const baseDtoProperty = BaseDtoProperty(FileModel, props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: 'string',
    format: 'binary',
    example: props.example,
  });
  const isArray = props.isArray === true;
  const isFile = isArray ? IsFiles() : IsFile();
  const hasMimeType = HasMimeType(props.allowedMimeType, {
    each: isArray,
    message: (args: ValidationArguments) => {
      const allowedValue = props.allowedMimeType.join(', ');
      return `o campo '${args.property}' não é compatível com os valores esperados: ${allowedValue}`;
    },
  });

  const decorators = [baseDtoProperty, apiProperty, isFile, hasMimeType];

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  }

  return applyDecorators(...decorators);
}
