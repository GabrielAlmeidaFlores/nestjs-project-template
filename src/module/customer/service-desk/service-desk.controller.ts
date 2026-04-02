import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { CreateCustomerSupportTicketMessageRequestDto } from '@module/customer/service-desk/dto/request/create-customer-support-ticket-message.request.dto';
import { CreateCustomerSupportTicketRequestDto } from '@module/customer/service-desk/dto/request/create-customer-support-ticket.request.dto';
import { ListCustomerSupportTicketMessagesRequestDto } from '@module/customer/service-desk/dto/request/list-customer-support-ticket-messages.request.dto';
import { ListCustomerSupportTicketsRequestDto } from '@module/customer/service-desk/dto/request/list-customer-support-tickets.request.dto';
import { CreateCustomerSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/create-customer-support-ticket.response.dto';
import { CreateCustomerSupportTicketMessageUseCase } from '@module/customer/service-desk/use-case/create-customer-support-ticket-message.use-case';
import { CreateCustomerSupportTicketUseCase } from '@module/customer/service-desk/use-case/create-customer-support-ticket.use-case';
import { GetCustomerSupportTicketDetailsUseCase } from '@module/customer/service-desk/use-case/get-customer-support-ticket-details.use-case';
import { ListCustomerSupportTicketMessagesUseCase } from '@module/customer/service-desk/use-case/list-customer-support-ticket-messages.use-case';
import { ListCustomerSupportTicketsUseCase } from '@module/customer/service-desk/use-case/list-customer-support-tickets.use-case';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { GetSupportTicketDetailsResponseDto } from '@module/support/service-desk/dto/response/get-support-ticket-details.response.dto';
import { ListSupportTicketMessagesResponseDto } from '@module/support/service-desk/dto/response/list-support-ticket-messages.response.dto';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { OrganizationSessionGuard } from '@shared/api/gateway/guard/organization-session/organization-session.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetOrganizationSessionData } from '@shared/api/util/decorator/property/get-organization-session-data/get-organization-session-data.decorator';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('service-desk')
export class ServiceDeskController {
  protected readonly _type = ServiceDeskController.name;

  public constructor(
    private readonly listCustomerSupportTicketsUseCase: ListCustomerSupportTicketsUseCase,
    private readonly getCustomerSupportTicketDetailsUseCase: GetCustomerSupportTicketDetailsUseCase,
    private readonly listCustomerSupportTicketMessagesUseCase: ListCustomerSupportTicketMessagesUseCase,
    private readonly createCustomerSupportTicketMessageUseCase: CreateCustomerSupportTicketMessageUseCase,
    private readonly createCustomerSupportTicketUseCase: CreateCustomerSupportTicketUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar tickets de suporte da organização (paginado)',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'tickets',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de tickets de suporte.',
      type: ListSupportTicketsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listSupportTickets(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Query() dto: ListCustomerSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    return this.listCustomerSupportTicketsUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Buscar detalhes de um ticket de suporte por id',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'tickets/:supportTicketId',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do ticket de suporte.',
      type: GetSupportTicketDetailsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getSupportTicketDetails(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailsResponseDto> {
    return this.getCustomerSupportTicketDetailsUseCase.execute(
      sessionData,
      organizationSessionData,
      supportTicketId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar mensagens de um ticket de suporte de forma paginada',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'tickets/:supportTicketId/messages',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de mensagens do ticket de suporte.',
      type: ListSupportTicketMessagesResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listSupportTicketMessages(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
    @Query() dto: ListCustomerSupportTicketMessagesRequestDto,
  ): Promise<ListSupportTicketMessagesResponseDto> {
    return this.listCustomerSupportTicketMessagesUseCase.execute(
      sessionData,
      organizationSessionData,
      supportTicketId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar mensagem em um ticket de suporte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'tickets/:supportTicketId/messages',
      method: RequestMethod.POST,
      type: CreateCustomerSupportTicketMessageRequestDto,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Mensagem criada com sucesso.',
      type: SupportTicketMessageItemResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSupportTicketMessage(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
    @Body() dto: CreateCustomerSupportTicketMessageRequestDto,
  ): Promise<SupportTicketMessageItemResponseDto> {
    return this.createCustomerSupportTicketMessageUseCase.execute(
      sessionData,
      organizationSessionData,
      supportTicketId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar ticket de suporte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: 'tickets',
      method: RequestMethod.POST,
      type: CreateCustomerSupportTicketRequestDto,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Ticket de suporte criado com sucesso.',
      type: CreateCustomerSupportTicketResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createSupportTicket(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData()
    organizationSessionData: OrganizationSessionDataModel,
    @Body() dto: CreateCustomerSupportTicketRequestDto,
  ): Promise<CreateCustomerSupportTicketResponseDto> {
    return this.createCustomerSupportTicketUseCase.execute(
      sessionData,
      organizationSessionData,
      dto,
    );
  }
}
