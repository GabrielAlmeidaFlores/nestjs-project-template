import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { CreateSupportTicketRequestDto } from '@module/customer/service-desk/dto/request/create-support-ticket.request.dto';
import { ListSupportTicketsRequestDto } from '@module/customer/service-desk/dto/request/list-support-tickets.request.dto';
import { SendTicketMessageRequestDto } from '@module/customer/service-desk/dto/request/send-ticket-message.request.dto';
import { CreateSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/create-support-ticket.response.dto';
import { GetSupportTicketDetailResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail.response.dto';
import { ListSupportTicketsResponseDto } from '@module/customer/service-desk/dto/response/list-support-tickets.response.dto';
import { SendSupportTicketMessageResponseDto } from '@module/customer/service-desk/dto/response/send-support-ticket-message.response.dto';
import { CreateSupportTicketUseCase } from '@module/customer/service-desk/use-case/create-support-ticket.use-case';
import { GetSupportTicketDetailUseCase } from '@module/customer/service-desk/use-case/get-support-ticket-detail.use-case';
import { ListSupportTicketsUseCase } from '@module/customer/service-desk/use-case/list-support-tickets.use-case';
import { SendTicketMessageCustomerUseCase } from '@module/customer/service-desk/use-case/send-ticket-message-customer.use-case';
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
    private readonly listSupportTicketsUseCase: ListSupportTicketsUseCase,
    private readonly createSupportTicketUseCase: CreateSupportTicketUseCase,
    private readonly getSupportTicketDetailUseCase: GetSupportTicketDetailUseCase,
    private readonly sendTicketMessageCustomerUseCase: SendTicketMessageCustomerUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar chamados de suporte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de chamados obtida com sucesso.',
      type: ListSupportTicketsResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async listTickets(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData() orgSession: OrganizationSessionDataModel,
    @Query() dto: ListSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    return this.listSupportTicketsUseCase.execute(sessionData, orgSession, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Criar chamado de suporte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSupportTicketRequestDto,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Chamado criado com sucesso.',
      type: CreateSupportTicketResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async createTicket(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData() orgSession: OrganizationSessionDataModel,
    @Body() dto: CreateSupportTicketRequestDto,
  ): Promise<CreateSupportTicketResponseDto> {
    return this.createSupportTicketUseCase.execute(
      sessionData,
      orgSession,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhes de um chamado de suporte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':supportTicketId',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do chamado obtidos com sucesso.',
      type: GetSupportTicketDetailResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async getTicketDetail(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData() orgSession: OrganizationSessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailResponseDto> {
    return this.getSupportTicketDetailUseCase.execute(
      sessionData,
      orgSession,
      supportTicketId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar mensagem em um chamado de suporte',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: ':supportTicketId/messages',
      method: RequestMethod.POST,
      type: SendTicketMessageRequestDto,
    },
    tag: ['customer/service-desk'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Mensagem enviada com sucesso.',
      type: SendSupportTicketMessageResponseDto,
    },
    guard: [AuthGuard, OrganizationSessionGuard],
  })
  public async sendMessage(
    @GetSessionData() sessionData: SessionDataModel,
    @GetOrganizationSessionData() orgSession: OrganizationSessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
    @Body() dto: SendTicketMessageRequestDto,
  ): Promise<SendSupportTicketMessageResponseDto> {
    return this.sendTicketMessageCustomerUseCase.execute(
      sessionData,
      orgSession,
      supportTicketId,
      dto,
    );
  }
}
