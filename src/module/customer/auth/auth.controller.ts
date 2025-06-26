import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { SignUpRequestDto } from '@module/customer/auth/dto/request/sign-up.request.dto';
import { SignUpResponseDto } from '@module/customer/auth/dto/response/sign-up.response.dto';
import { SignUpUseCase } from '@module/customer/auth/use-case/sign-up.use-case';
import { CustomerController } from '@shared/api/decorator/class/controller-routing/customer-controller.decorator';
import { BuildEndpointSpecification } from '@shared/api/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@CustomerController('auth')
export class AuthController {
  protected readonly _type = AuthController.name;

  public constructor(private readonly signUpUseCase: SignUpUseCase) {}

  @BuildEndpointSpecification({
    summary: 'Customer signup',
    secure: false,
    http: {
      path: 'sign-up',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Customer signed up successfully',
      type: SignUpResponseDto,
    },
  })
  public async signUp(
    @Body() dto: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    return await this.signUpUseCase.execute(dto);
  }
}
