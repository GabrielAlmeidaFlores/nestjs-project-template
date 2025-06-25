import {
  All,
  applyDecorators,
  Delete,
  Get,
  Head,
  HttpCode,
  HttpStatus,
  Options,
  Patch,
  Post,
  Put,
  RequestMethod,
  Search,
  SetMetadata,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ErrorResponseDto } from '@shared/api/dto/response/error/error.response.dto';

import type { ApiResponseOptions } from '@nestjs/swagger';
import type { BuildEndpointSpecificationDecoratorPropsInterface } from '@shared/api/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator.props.interface';
import type { BuildEndpointHttpSpecificationInterface } from '@shared/api/decorator/method/build-endpoint-specification/interface/build-endpoint-http-specification.interface';
import type { BuildEndpointSuccessResponseSpecificationType } from '@shared/api/decorator/method/build-endpoint-specification/type/build-endpoint-success-response-specification.type';

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
  successResponse: BuildEndpointSuccessResponseSpecificationType,
): MethodDecorator[] {
  const isNoContentResponse =
    successResponse.statusCode === HttpStatus.NO_CONTENT;

  const successResponseOptions: ApiResponseOptions = {
    status: successResponse.statusCode,
    description: successResponse.description,
    ...(isNoContentResponse ? {} : { type: successResponse.type }),
  };

  const successResponseSpecification = ApiResponse(successResponseOptions);
  const successResponseStatusCodeSpecification = HttpCode(
    successResponse.statusCode,
  );

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
    successResponseStatusCodeSpecification,
    clientSideErrorResponseSpecification,
    serverSideErrorResponseSpecification,
  ];

  if (!isNoContentResponse) {
    decorators.push(SetMetadata('successResponseType', successResponse.type));
  }

  return decorators;
}

function buildEndpointHttpSpecification(
  http: BuildEndpointHttpSpecificationInterface,
): MethodDecorator[] {
  const httpMethodMap: Record<RequestMethod, () => MethodDecorator> = {
    [RequestMethod.GET]: (): MethodDecorator => Get(http.path),
    [RequestMethod.POST]: (): MethodDecorator => Post(http.path),
    [RequestMethod.PUT]: (): MethodDecorator => Put(http.path),
    [RequestMethod.DELETE]: (): MethodDecorator => Delete(http.path),
    [RequestMethod.PATCH]: (): MethodDecorator => Patch(http.path),
    [RequestMethod.OPTIONS]: (): MethodDecorator => Options(http.path),
    [RequestMethod.HEAD]: (): MethodDecorator => Head(http.path),
    [RequestMethod.SEARCH]: (): MethodDecorator => Search(http.path),
    [RequestMethod.ALL]: (): MethodDecorator => All(http.path),
  };

  const httpMethod = httpMethodMap[http.method]();

  const decorators = [httpMethod];

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
  const endpointHttpSpecification = buildEndpointHttpSpecification(props.http);

  const decorators = [
    ...endpointOperationSpecification,
    ...endpointResponseSpecification,
    ...endpointAuthSpecification,
    ...endpointHttpSpecification,
  ];

  return applyDecorators(...decorators);
}
