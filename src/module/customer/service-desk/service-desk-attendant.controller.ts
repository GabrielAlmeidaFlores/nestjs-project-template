import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ListSupportTicketsRequestDto } from '@module/customer/service-desk/dto/request/list-support-tickets.request.dto';
import { SendTicketMessageRequestDto } from '@module/customer/service-desk/dto/request/send-ticket-message.request.dto';
import { GetSupportTicketDetailResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail.response.dto';
import { ListSupportTicketsResponseDto } from '@module/customer/service-desk/dto/response/list-support-tickets.response.dto';
import { ResolveSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/resolve-support-ticket.response.dto';
import { SendSupportTicketMessageResponseDto } from '@module/customer/service-desk/dto/response/send-support-ticket-message.response.dto';
import { StartSupportTicketResponseDto } from '@module/customer/service-desk/dto/response/start-support-ticket.response.dto';
import { GetSupportAttendantProfileResponseDto } from '@module/customer/service-desk/dto/response/get-support-attendant-profile.response.dto';
import { GetSupportAttendantProfileUseCase } from '@module/customer/service-desk/use-case/get-support-attendant-profile.use-case';
import { GetSupportTicketDetailUseCase } from '@module/customer/service-desk/use-case/get-support-ticket-detail.use-case';
import { ListSupportTicketsAttendantUseCase } from '@module/customer/service-desk/use-case/list-support-tickets-attendant.use-case';
import { ResolveSupportTicketUseCase } from '@module/customer/service-desk/use-case/resolve-support-ticket.use-case';
import { SendTicketMessageAttendantUseCase } from '@module/customer/service-desk/use-case/send-ticket-message-attendant.use-case';
import { StartSupportTicketUseCase } from '@module/customer/service-desk/use-case/start-support-ticket.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('service-desk/attendant')
export class ServiceDeskAttendantController {
  protected readonly _type = ServiceDeskAttendantController.name;

  public constructor(
    private readonly listSupportTicketsAttendantUseCase: ListSupportTicketsAttendantUseCase,
    private readonly getSupportTicketDetailUseCase: GetSupportTicketDetailUseCase,
    private readonly startSupportTicketUseCase: StartSupportTicketUseCase,
    private readonly resolveSupportTicketUseCase: ResolveSupportTicketUseCase,
    private readonly sendTicketMessageAttendantUseCase: SendTicketMessageAttendantUseCase,
    private readonly getSupportAttendantProfileUseCase: GetSupportAttendantProfileUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar chamados de suporte (atendente)',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk/attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de chamados obtida com sucesso.',
      type: ListSupportTicketsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listTickets(
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: ListSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    return this.listSupportTicketsAttendantUseCase.execute(
      sessionData,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhes de um chamado de suporte (atendente)',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: ':supportTicketId',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk/attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do chamado obtidos com sucesso.',
      type: GetSupportTicketDetailResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getTicketDetail(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailResponseDto> {
    return this.getSupportTicketDetailUseCase.execute(
      sessionData,
      null,
      supportTicketId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Iniciar atendimento de um chamado',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: ':supportTicketId/start',
      method: RequestMethod.PATCH,
    },
    tag: ['customer/service-desk/attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Atendimento iniciado com sucesso.',
      type: StartSupportTicketResponseDto,
    },
    guard: [AuthGuard],
  })
  public async startTicket(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<StartSupportTicketResponseDto> {
    return this.startSupportTicketUseCase.execute(
      sessionData,
      supportTicketId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Resolver um chamado de suporte',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: ':supportTicketId/resolve',
      method: RequestMethod.PATCH,
    },
    tag: ['customer/service-desk/attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Chamado resolvido com sucesso.',
      type: ResolveSupportTicketResponseDto,
    },
    guard: [AuthGuard],
  })
  public async resolveTicket(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<ResolveSupportTicketResponseDto> {
    return this.resolveSupportTicketUseCase.execute(
      sessionData,
      supportTicketId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Enviar mensagem em um chamado de suporte (atendente)',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: ':supportTicketId/messages',
      method: RequestMethod.POST,
      type: SendTicketMessageRequestDto,
    },
    tag: ['customer/service-desk/attendant'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Mensagem enviada com sucesso.',
      type: SendSupportTicketMessageResponseDto,
    },
    guard: [AuthGuard],
  })
  public async sendMessage(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
    @Body() dto: SendTicketMessageRequestDto,
  ): Promise<SendSupportTicketMessageResponseDto> {
    return this.sendTicketMessageAttendantUseCase.execute(
      sessionData,
      supportTicketId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Obter perfil do atendente autenticado',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: 'profile',
      method: RequestMethod.GET,
    },
    tag: ['customer/service-desk/attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Perfil do atendente obtido com sucesso.',
      type: GetSupportAttendantProfileResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getProfile(
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<GetSupportAttendantProfileResponseDto> {
    return this.getSupportAttendantProfileUseCase.execute(
      sessionData.authIdentityId,
    );
  }
}
