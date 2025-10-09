import 'reflect-metadata';
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { minutes, Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';

import { InvalidFormDataStructureError } from '@shared/api/util/decorator/method/build-endpoint-specification/error/invalid-form-data-structure.error';
import { DTO_PROPS_SYMBOL } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/symbol/dto-props.symbol';
import { ErrorResponseDto } from '@shared/api/util/dto/response/error.response.dto';
import { FileModel } from '@shared/system/model/generic/file.model';

import type { CanActivate, Type } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import type { BuildEndpointSpecificationDecoratorPropsInterface } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator.props.interface';
import type { BuildEndpointHttpSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-http-specification.type';
import type { BuildEndpointSuccessResponseSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-success-response-specification.type';
import type { BuildEndpointThrottleSpecificationType } from '@shared/api/util/decorator/method/build-endpoint-specification/type/build-endpoint-throttle-specification.type';
import type { DtoPropMetaType } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/type/dto-props-metadata.type';

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
    decorators.push(ApiSecurity('cookieAuth'));
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
  http: BuildEndpointHttpSpecificationType,
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

  const pathParamsRegex = /:([^/]+)/g;
  const paramMatches = http.path.match(pathParamsRegex);

  if (paramMatches) {
    for (const param of paramMatches) {
      const paramName = param.substring(1);

      decorators.push(
        ApiParam({
          name: paramName,
          type: String,
        }),
      );
    }
  }

  if (!('type' in http)) {
    return decorators;
  }

  const type = http['type'];
  const raw = Reflect.getMetadata(DTO_PROPS_SYMBOL, type) as DtoPropMetaType[];

  const dtoFileField = raw.find((dtoProp) => {
    return dtoProp.type === FileModel;
  });

  const findNonFileFields = raw.filter((dtoProp) => {
    return !(dtoProp.type === FileModel);
  });

  if (dtoFileField) {
    decorators.push(ApiConsumes('multipart/form-data'));
    decorators.push(FormDataRequest({ storage: MemoryStoredFile }));

    if (findNonFileFields.length > 1) {
      throw new InvalidFormDataStructureError();
    }

    if (findNonFileFields.length >= 1 && findNonFileFields[0]?.key !== 'json') {
      throw new InvalidFormDataStructureError();
    }
  }
  return decorators;
}

function buildEndpointThrottleSpecification(
  props?: BuildEndpointThrottleSpecificationType,
): MethodDecorator[] {
  const decorator: MethodDecorator[] = [];

  if (props) {
    decorator.push(UseGuards(ThrottlerGuard));
    decorator.push(
      Throttle({
        default: { limit: props.limit, ttl: minutes(props.ttlInMinutes) },
      }),
    );
  }

  return decorator;
}

function buildEndpointGuardSpecificationInterface(
  props?: Array<Type<CanActivate> | CanActivate>,
): MethodDecorator[] {
  if (!props || props.length === 0) {
    return [];
  }

  return [UseGuards(...props)];
}

function buildEndpointTagSpecification(
  tags?: Array<string>,
): MethodDecorator[] {
  if (!tags) {
    return [];
  }

  return [ApiTags(...tags)];
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
    props.guard && props.guard.length > 0 ? true : false,
  );
  const endpointHttpSpecification = buildEndpointHttpSpecification(props.http);
  const endpointThrottleSpecification = buildEndpointThrottleSpecification(
    props.throttle,
  );
  const endpointGuardSpecification = buildEndpointGuardSpecificationInterface(
    props.guard,
  );
  const endpointTagSpecification = buildEndpointTagSpecification(props.tag);

  const decorators = [
    ...endpointOperationSpecification,
    ...endpointResponseSpecification,
    ...endpointAuthSpecification,
    ...endpointThrottleSpecification,
    ...endpointHttpSpecification,
    ...endpointGuardSpecification,
    ...endpointTagSpecification,
  ];

  return applyDecorators(...decorators);
}
