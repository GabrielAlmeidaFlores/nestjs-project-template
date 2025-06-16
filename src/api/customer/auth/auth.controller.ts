import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { SignUpRequestDto } from '@api/customer/auth/dto/request/sign-up.request.dto';
import { SignUpUseCase } from '@api/customer/auth/use-case/signup.use-case';
import { CustomerController } from '@shared/api/decorator/class/controller-routing/customer-controller.decorator';
import { BuildEndpointSpecification } from '@shared/api/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@CustomerController('auth')
export class AuthController {
  protected readonly _type = AuthController.name;

  public constructor(public readonly signUpUseCase: SignUpUseCase) {}

  @BuildEndpointSpecification({
    summary: 'Customer signup',
    secure: false,
    http: {
      path: 'sign-up',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Customer signed up successfully',
    },
  })
  public async signUp(@Body() dto: SignUpRequestDto): Promise<void> {
    return await this.signUpUseCase.execute(dto);
  }
}
