import { applyDecorators, HttpStatus, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ErrorResponseDto } from '@shared/api/dto/response/error/error.response.dto';

import type { ApiResponseOptions } from '@nestjs/swagger';
import type { BuildEndpointSpecificationDecoratorPropsInterface } from '@shared/api/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator.props.interface';
import type { SuccessResponseType } from '@shared/api/decorator/method/build-endpoint-specification/type/success-response.type';

function buildEndpointOperationSpecification(
  summary: string,
  deprecated: boolean,
): MethodDecorator[] {
  const endpointOperationSpecification = ApiOperation({
    summary,
    deprecated,
  });

  const decorators = [endpointOperationSpecification];

  return decorators;
}

function buildEndpointAuthSpecification(
  secure: boolean,
): (MethodDecorator & ClassDecorator)[] {
  const decorators: (MethodDecorator & ClassDecorator)[] = [];

  if (secure) {
    decorators.push(ApiBearerAuth());
  }

  return decorators;
}

function buildEndpointResponseSpecification(
  successResponse: SuccessResponseType,
): (MethodDecorator & ClassDecorator)[] {
  const successResponseOptions: ApiResponseOptions = {
    status: successResponse.statusCode,
    description: successResponse.description,
  };

  const successResponseSpecification = ApiResponse(successResponseOptions);
  const clientSideErrorResponseSpecification = ApiResponse({
    status: '4XX',
    description: 'Client error',
    type: ErrorResponseDto,
  });
  const serverSideErrorResponseSpecification = ApiResponse({
    status: '5XX',
    description: 'Server error',
    type: ErrorResponseDto,
  });

  const decorators = [
    successResponseSpecification,
    clientSideErrorResponseSpecification,
    serverSideErrorResponseSpecification,
  ];

  const isNoContentResponse =
    successResponse.statusCode === HttpStatus.NO_CONTENT;
  if (!isNoContentResponse) {
    successResponseOptions.type = successResponse.type;

    decorators.push(SetMetadata('successResponseType', successResponse.type));
  }

  return decorators;
}

export function BuildEndpointSpecification(
  props: BuildEndpointSpecificationDecoratorPropsInterface,
): MethodDecorator {
  const isEndpointDeprecated = props.deprecated ?? false;

  const endpointOperationSpecification = buildEndpointOperationSpecification(
    props.summary,
    isEndpointDeprecated,
  );
  const endpointResponseSpecification = buildEndpointResponseSpecification(
    props.successResponse,
  );
  const endpointAuthSpecification = buildEndpointAuthSpecification(
    props.secure,
  );

  const decorators = [
    ...endpointOperationSpecification,
    ...endpointResponseSpecification,
    ...endpointAuthSpecification,
  ];

  return applyDecorators(...decorators);
}
