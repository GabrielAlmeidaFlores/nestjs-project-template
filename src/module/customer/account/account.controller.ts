import { RequestMethod, HttpStatus, Body } from '@nestjs/common';

import { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';

@CustomerControllerRoute('account')
export class AccountController {
  protected readonly _type = AccountController.name;

  public constructor(
    private readonly customerSignUpUseCase: CustomerSignUpUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Customer sign-up',
    http: {
      path: 'sign-up',
      method: RequestMethod.POST,
    },
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Customer signed up successfully',
      type: CustomerSignUpResponseDto,
    },
    throttle: {
      limit: 100,
      ttlInMinutes: 5,
    },
    guard: [AuthGuard],
  })
  public async customerSignUp(
    @Body() dto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
    return await this.customerSignUpUseCase.execute(dto);
  }
}
