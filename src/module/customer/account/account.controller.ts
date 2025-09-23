import { RequestMethod, HttpStatus, Body } from '@nestjs/common';

import { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { UpdateCustomerProfilePictureRequestDto } from '@module/customer/account/dto/request/update-customer-profile-picture.request.dto';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { UpdateCustomerProfilePictureResponseDto } from '@module/customer/account/dto/response/update-customer-profile-picture.response.dto';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@CustomerControllerRoute('account')
export class AccountController {
  protected readonly _type = AccountController.name;

  public constructor(
    private readonly customerSignUpUseCase: CustomerSignUpUseCase,
    private readonly updateCustomerProfilePictureUseCase: UpdateCustomerProfilePictureUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Customer sign-up',
    http: {
      path: 'sign-up',
      method: RequestMethod.POST,
      type: CustomerSignUpRequestDto,
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
  })
  public async customerSignUp(
    @Body() dto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
    return await this.customerSignUpUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Update customer profile picture',
    http: {
      path: 'profile/picture',
      method: RequestMethod.PATCH,
      type: UpdateCustomerProfilePictureRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Customer profile picture updated successfully',
      type: UpdateCustomerProfilePictureResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateCustomerProfilePicture(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: UpdateCustomerProfilePictureRequestDto,
  ): Promise<UpdateCustomerProfilePictureResponseDto> {
    return await this.updateCustomerProfilePictureUseCase.execute(
      sessionData,
      dto,
    );
  }
}
