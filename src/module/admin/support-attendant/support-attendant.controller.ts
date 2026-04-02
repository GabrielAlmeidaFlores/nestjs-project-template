import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { CreateSupportAttendantRequestDto } from '@module/admin/support-attendant/dto/request/create-support-attendant.request.dto';
import { ListSupportAttendantsRequestDto } from '@module/admin/support-attendant/dto/request/list-support-attendants.request.dto';
import { ListTicketsAdminRequestDto } from '@module/admin/support-attendant/dto/request/list-tickets-admin.request.dto';
import { UpdateSupportAttendantRequestDto } from '@module/admin/support-attendant/dto/request/update-support-attendant.request.dto';
import { CreateSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/create-support-attendant.response.dto';
import { GetSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/get-support-attendant.response.dto';
import { ListSupportAttendantsResponseDto } from '@module/admin/support-attendant/dto/response/list-support-attendants.response.dto';
import { UpdateSupportAttendantResponseDto } from '@module/admin/support-attendant/dto/response/update-support-attendant.response.dto';
import { CreateSupportAttendantUseCase } from '@module/admin/support-attendant/use-case/create-support-attendant.use-case';
import { GetSupportAttendantDetailsUseCase } from '@module/admin/support-attendant/use-case/get-support-attendant-details.use-case';
import { GetSupportTicketDetailsAdminUseCase } from '@module/admin/support-attendant/use-case/get-support-ticket-details-admin.use-case';
import { ListSupportAttendantsUseCase } from '@module/admin/support-attendant/use-case/list-support-attendants.use-case';
import { ListSupportTicketMessagesAdminUseCase } from '@module/admin/support-attendant/use-case/list-support-ticket-messages-admin.use-case';
import { ListTicketsAdminUseCase } from '@module/admin/support-attendant/use-case/list-tickets-admin.use-case';
import { UpdateSupportAttendantUseCase } from '@module/admin/support-attendant/use-case/update-support-attendant.use-case';
import { ListSupportAttendantsQueryParam } from '@module/support/account/domain/repository/support-attendant/query/param/list-support-attendants.query.param';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ListSupportTicketMessagesRequestDto } from '@module/support/service-desk/dto/request/list-support-ticket-messages.request.dto';
import { GetSupportTicketDetailsResponseDto } from '@module/support/service-desk/dto/response/get-support-ticket-details.response.dto';
import { ListSupportTicketMessagesResponseDto } from '@module/support/service-desk/dto/response/list-support-ticket-messages.response.dto';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('support-attendant')
export class SupportAttendantController {
  protected readonly _type = SupportAttendantController.name;

  public constructor(
    private readonly createSupportAttendantUseCase: CreateSupportAttendantUseCase,
    private readonly listSupportAttendantsUseCase: ListSupportAttendantsUseCase,
    private readonly getSupportAttendantDetailsUseCase: GetSupportAttendantDetailsUseCase,
    private readonly listTicketsAdminUseCase: ListTicketsAdminUseCase,
    private readonly updateSupportAttendantUseCase: UpdateSupportAttendantUseCase,
    private readonly getSupportTicketDetailsAdminUseCase: GetSupportTicketDetailsAdminUseCase,
    private readonly listSupportTicketMessagesAdminUseCase: ListSupportTicketMessagesAdminUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar atendente de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateSupportAttendantRequestDto,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description:
        'Atendente de suporte criado com sucesso. Um e-mail com as credenciais de acesso é enviado.',
      type: CreateSupportAttendantResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createSupportAttendant(
    @Body() dto: CreateSupportAttendantRequestDto,
  ): Promise<CreateSupportAttendantResponseDto> {
    return this.createSupportAttendantUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Listar atendentes de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de atendentes de suporte retornada com sucesso.',
      type: ListSupportAttendantsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listSupportAttendants(
    @Query() dto: ListSupportAttendantsRequestDto,
  ): Promise<ListSupportAttendantsResponseDto> {
    return this.listSupportAttendantsUseCase.execute(
      new ListSupportAttendantsQueryParam(dto),
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar chamados de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'tickets',
      method: RequestMethod.GET,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de chamados retornada com sucesso.',
      type: ListSupportTicketsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listTicketsAdmin(
    @Query() dto: ListTicketsAdminRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    return this.listTicketsAdminUseCase.execute(dto);
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhes de um atendente de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':supportAttendantId',
      method: RequestMethod.GET,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do atendente de suporte retornados com sucesso.',
      type: GetSupportAttendantResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getSupportAttendantDetails(
    @Param('supportAttendantId', new ParseValueObjectPipe(SupportAttendantId))
    supportAttendantId: SupportAttendantId,
  ): Promise<GetSupportAttendantResponseDto> {
    return this.getSupportAttendantDetailsUseCase.execute(supportAttendantId);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar atendente de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':supportAttendantId',
      method: RequestMethod.PATCH,
      type: UpdateSupportAttendantRequestDto,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Atendente de suporte atualizado com sucesso.',
      type: UpdateSupportAttendantResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateSupportAttendant(
    @Param('supportAttendantId', new ParseValueObjectPipe(SupportAttendantId))
    supportAttendantId: SupportAttendantId,
    @Body() dto: UpdateSupportAttendantRequestDto,
  ): Promise<UpdateSupportAttendantResponseDto> {
    return this.updateSupportAttendantUseCase.execute(supportAttendantId, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Obter detalhes de um chamado de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'tickets/:supportTicketId',
      method: RequestMethod.GET,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do chamado retornados com sucesso.',
      type: GetSupportTicketDetailsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getSupportTicketDetails(
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailsResponseDto> {
    return this.getSupportTicketDetailsAdminUseCase.execute(supportTicketId);
  }

  @BuildEndpointSpecification({
    summary: 'Listar mensagens de um chamado de suporte',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'tickets/:supportTicketId/messages',
      method: RequestMethod.GET,
    },
    tag: ['support-attendant'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Mensagens do chamado retornadas com sucesso.',
      type: ListSupportTicketMessagesResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listSupportTicketMessages(
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
    @Query() dto: ListSupportTicketMessagesRequestDto,
  ): Promise<ListSupportTicketMessagesResponseDto> {
    return this.listSupportTicketMessagesAdminUseCase.execute(
      supportTicketId,
      dto,
    );
  }
}
