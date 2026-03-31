import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { InviteSupportAttendantRequestDto } from '@module/admin/service-desk/dto/request/invite-support-attendant.request.dto';
import { ListAdminSupportTicketsRequestDto } from '@module/admin/service-desk/dto/request/list-admin-support-tickets.request.dto';
import { ListSupportAttendantsRequestDto } from '@module/admin/service-desk/dto/request/list-support-attendants.request.dto';
import { ToggleSupportAttendantStatusRequestDto } from '@module/admin/service-desk/dto/request/toggle-support-attendant-status.request.dto';
import { UpdateSupportAttendantRequestDto } from '@module/admin/service-desk/dto/request/update-support-attendant.request.dto';
import { InviteSupportAttendantResponseDto } from '@module/admin/service-desk/dto/response/invite-support-attendant.response.dto';
import { ListSupportAttendantsResponseDto } from '@module/admin/service-desk/dto/response/list-support-attendants.response.dto';
import { ToggleSupportAttendantStatusResponseDto } from '@module/admin/service-desk/dto/response/toggle-support-attendant-status.response.dto';
import { UpdateSupportAttendantResponseDto } from '@module/admin/service-desk/dto/response/update-support-attendant.response.dto';
import { InviteNewSupportAttendantUseCase } from '@module/admin/service-desk/use-case/invite-new-support-attendant.use-case';
import { ListAdminSupportTicketsByAttendantUseCase } from '@module/admin/service-desk/use-case/list-admin-support-tickets-by-attendant.use-case';
import { ListAdminSupportTicketsUseCase } from '@module/admin/service-desk/use-case/list-admin-support-tickets.use-case';
import { ListSupportAttendantsUseCase } from '@module/admin/service-desk/use-case/list-support-attendants.use-case';
import { ToggleSupportAttendantStatusUseCase } from '@module/admin/service-desk/use-case/toggle-support-attendant-status.use-case';
import { UpdateSupportAttendantUseCase } from '@module/admin/service-desk/use-case/update-support-attendant.use-case';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { GetSupportTicketDetailResponseDto } from '@module/customer/service-desk/dto/response/get-support-ticket-detail.response.dto';
import { ListSupportTicketsResponseDto } from '@module/customer/service-desk/dto/response/list-support-tickets.response.dto';
import { GetSupportTicketDetailUseCase } from '@module/customer/service-desk/use-case/get-support-ticket-detail.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('service-desk')
export class AdminServiceDeskController {
  protected readonly _type = AdminServiceDeskController.name;

  public constructor(
    private readonly inviteNewSupportAttendantUseCase: InviteNewSupportAttendantUseCase,
    private readonly listAdminSupportTicketsByAttendantUseCase: ListAdminSupportTicketsByAttendantUseCase,
    private readonly listAdminSupportTicketsUseCase: ListAdminSupportTicketsUseCase,
    private readonly listSupportAttendantsUseCase: ListSupportAttendantsUseCase,
    private readonly toggleSupportAttendantStatusUseCase: ToggleSupportAttendantStatusUseCase,
    private readonly updateSupportAttendantUseCase: UpdateSupportAttendantUseCase,
    private readonly getSupportTicketDetailUseCase: GetSupportTicketDetailUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Convidar novo atendente de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'attendants/invite',
      method: RequestMethod.POST,
      type: InviteSupportAttendantRequestDto,
    },
    tag: ['admin/service-desk'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Convite enviado com sucesso.',
      type: InviteSupportAttendantResponseDto,
    },
    guard: [AuthGuard],
  })
  public async inviteAttendant(
    @Body() dto: InviteSupportAttendantRequestDto,
  ): Promise<InviteSupportAttendantResponseDto> {
    return this.inviteNewSupportAttendantUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Listar atendentes de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'attendants',
      method: RequestMethod.GET,
    },
    tag: ['admin/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de atendentes obtida com sucesso.',
      type: ListSupportAttendantsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listAttendants(
    @Query() dto: ListSupportAttendantsRequestDto,
  ): Promise<ListSupportAttendantsResponseDto> {
    return this.listSupportAttendantsUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Listar todos os chamados de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'tickets',
      method: RequestMethod.GET,
    },
    tag: ['admin/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de chamados obtida com sucesso.',
      type: ListSupportTicketsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listTickets(
    @Query() dto: ListAdminSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    return this.listAdminSupportTicketsUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhes de um chamado de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'tickets/:supportTicketId',
      method: RequestMethod.GET,
    },
    tag: ['admin/service-desk'],
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
    return this.getSupportTicketDetailUseCase.execute(sessionData, null, supportTicketId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar chamados de suporte por atendente',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'attendants/:supportAttendantId/tickets',
      method: RequestMethod.GET,
    },
    tag: ['admin/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de chamados do atendente obtida com sucesso.',
      type: ListSupportTicketsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listTicketsByAttendant(
    @Param('supportAttendantId', new ParseValueObjectPipe(SupportAttendantId))
    supportAttendantId: SupportAttendantId,
    @Query() dto: ListAdminSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    return this.listAdminSupportTicketsByAttendantUseCase.execute(
      supportAttendantId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Alterar status de atendente de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'attendants/:supportAttendantId/status',
      method: RequestMethod.PATCH,
      type: ToggleSupportAttendantStatusRequestDto,
    },
    tag: ['admin/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Status do atendente alterado com sucesso.',
      type: ToggleSupportAttendantStatusResponseDto,
    },
    guard: [AuthGuard],
  })
  public async toggleAttendantStatus(
    @Param('supportAttendantId', new ParseValueObjectPipe(SupportAttendantId))
    supportAttendantId: SupportAttendantId,
    @Body() dto: ToggleSupportAttendantStatusRequestDto,
  ): Promise<ToggleSupportAttendantStatusResponseDto> {
    return this.toggleSupportAttendantStatusUseCase.execute(
      supportAttendantId,
      dto.isActive,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados de atendente de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'attendants/:supportAttendantId',
      method: RequestMethod.PATCH,
      type: UpdateSupportAttendantRequestDto,
    },
    tag: ['admin/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do atendente atualizados com sucesso.',
      type: UpdateSupportAttendantResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateAttendant(
    @Param('supportAttendantId', new ParseValueObjectPipe(SupportAttendantId))
    supportAttendantId: SupportAttendantId,
    @Body() dto: UpdateSupportAttendantRequestDto,
  ): Promise<UpdateSupportAttendantResponseDto> {
    return this.updateSupportAttendantUseCase.execute(supportAttendantId, dto);
  }
}
