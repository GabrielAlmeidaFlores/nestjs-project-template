import { RequestMethod, HttpStatus, Body, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
import { SetOrganizationForCustomerRequestDto } from '@module/customer/account/dto/request/set-organization-for-customer.request.dto';
import { UpdateCustomerProfilePictureRequestDto } from '@module/customer/account/dto/request/update-customer-profile-picture.request.dto';
import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';
import { GetAuthenticatedCustomerDataResponseDto } from '@module/customer/account/dto/response/get-authenticated-customer-data.response.dto';
import { ListCustomerOrganizationsResponseDto } from '@module/customer/account/dto/response/list-customer-organizations.response.dto';
import { SetOrganizationForCustomerResponseDto } from '@module/customer/account/dto/response/set-organization-for-customer.response.dto';
import { UpdateCustomerProfilePictureResponseDto } from '@module/customer/account/dto/response/update-customer-profile-picture.response.dto';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { GetAuthenticatedCustomerDataUseCase } from '@module/customer/account/use-case/get-authenticated-customer-data.use-case';
import { ListCustomerOrganizationsUseCase } from '@module/customer/account/use-case/list-customer-organizations.use-case';
import { SetOrganizationForCustomerUseCase } from '@module/customer/account/use-case/set-organization-for-customer.use-case';
import { UpdateCustomerProfilePictureUseCase } from '@module/customer/account/use-case/update-customer-profile-picture.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
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
    private readonly getAuthenticatedCustomerDataUseCase: GetAuthenticatedCustomerDataUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Cadastro de usuário',
    http: {
      path: 'sign-up',
      method: RequestMethod.POST,
      type: CustomerSignUpRequestDto,
    },
    tag: ['conta-do-usuario'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Cliente cadastrado com sucesso.',
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
    summary: 'Atualizar foto de perfil do usuário',
    http: {
      path: 'profile/picture',
      method: RequestMethod.PATCH,
      type: UpdateCustomerProfilePictureRequestDto,
    },
    tag: ['conta-do-usuario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Foto de perfil do usuário atualizada com sucesso.',
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
    summary: 'Listar organizações do usuário',
    http: {
      path: 'available/organization',
      method: RequestMethod.GET,
    },
    tag: ['conta-do-usuario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Organizações do usuário listadas com sucesso.',
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
    summary: 'Definir organização para a sessão do usuário',
    http: {
      path: 'session/organization',
      method: RequestMethod.POST,
      type: SetOrganizationForCustomerRequestDto,
    },
    tag: ['conta-do-usuario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Organização definida com sucesso para a sessão do usuário.',
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

  @BuildEndpointSpecification({
    summary: 'Obter dados do usuário autenticado',
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['conta-do-usuario'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do usuário autenticado retornados com sucesso.',
      type: GetAuthenticatedCustomerDataResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getAuthenticatedCustomerData(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<GetAuthenticatedCustomerDataResponseDto> {
    return await this.getAuthenticatedCustomerDataUseCase.execute(
      sessionData,
      organizationSessionData,
    );
  }
}
