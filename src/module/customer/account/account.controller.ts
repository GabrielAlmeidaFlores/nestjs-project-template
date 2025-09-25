import { RequestMethod, HttpStatus, Body, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { SetOrganizationForCustomerRequestDto } from '@module/customer/account/dto/request/set-organization-for-customer.request.dto';
import { UpdateCustomerProfilePictureRequestDto } from '@module/customer/account/dto/request/update-customer-profile-picture.request.dto';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { ListCustomerOrganizationsResponseDto } from '@module/customer/account/dto/response/list-customer-organizations.response.dto';
import { SetOrganizationForCustomerResponseDto } from '@module/customer/account/dto/response/set-organization-for-customer.response.dto';
import { UpdateCustomerProfilePictureResponseDto } from '@module/customer/account/dto/response/update-customer-profile-picture.response.dto';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { ListCustomerOrganizationsUseCase } from '@module/customer/account/use-case/list-customer-organizations.use-case';
import { SetOrganizationForCustomerUseCase } from '@module/customer/account/use-case/set-organization-for-customer.use-case';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@CustomerControllerRoute('account')
export class AccountController {
  protected readonly _type = AccountController.name;

  public constructor(
    private readonly customerSignUpUseCase: CustomerSignUpUseCase,
    private readonly updateCustomerProfilePictureUseCase: UpdateCustomerProfilePictureUseCase,
    private readonly listCustomerOrganizationsUseCase: ListCustomerOrganizationsUseCase,
    private readonly setOrganizationForCustomerUseCase: SetOrganizationForCustomerUseCase,
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

  @BuildEndpointSpecification({
    summary: 'List customer organizations',
    http: {
      path: 'available/organization',
      method: RequestMethod.GET,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Customer organizations listed successfully',
      type: ListCustomerOrganizationsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listCustomerOrganizations(
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCustomerOrganizationsResponseDto> {
    return await this.listCustomerOrganizationsUseCase.execute(
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Set customer organization',
    http: {
      path: 'set/organization',
      method: RequestMethod.POST,
      type: SetOrganizationForCustomerRequestDto,
    },
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Customer organization set successfully',
      type: SetOrganizationForCustomerResponseDto,
    },
    guard: [AuthGuard],
  })
  public async setOrganizationForCustomer(
    @Res({ passthrough: true }) reply: FastifyReply,
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: SetOrganizationForCustomerRequestDto,
  ): Promise<SetOrganizationForCustomerResponseDto> {
    return await this.setOrganizationForCustomerUseCase.execute(
      reply,
      sessionData,
      dto,
    );
  }
}
