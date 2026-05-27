import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, type ValidationArguments } from 'class-validator';
import { IsFile, HasMimeType, IsFiles } from 'nestjs-form-data';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { RequestDtoFilePropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/model/input/request-dto-file-property.decorator.props.input.model';

export function RequestDtoFileProperty(
  props?: RequestDtoFilePropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const baseDtoProperty = BaseDtoProperty(FileModel, props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: 'string',
    format: 'binary',
    example: props?.example,
  });
  const isArray = props?.isArray === true;
  const isFile = isArray ? IsFiles() : IsFile();
  const decorators = [baseDtoProperty, apiProperty, isFile];

  if (props?.allowedMimeType !== undefined) {
    decorators.push(
      HasMimeType(props.allowedMimeType, {
        each: isArray,
        message: (args: ValidationArguments) => {
          const receivedMimeType =
            (args.value as { mimeType?: string } | undefined)?.mimeType ??
            'desconhecido';
          const receivedFileName =
            (args.value as { originalName?: string } | undefined)
              ?.originalName ?? 'desconhecido';
          const allowedValue = props.allowedMimeType?.join(', ');
          return `o campo '${args.property}' recebeu o mimetype '${receivedMimeType}' (arquivo: ${receivedFileName}), mas os valores esperados são: ${allowedValue}`;
        },
      }),
    );
  }

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  }

  return applyDecorators(...decorators);
}
