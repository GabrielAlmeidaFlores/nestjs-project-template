import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { CreateSupportTicketMessageRequestDto } from '@module/support/service-desk/dto/request/create-support-ticket-message.request.dto';
import { ListSupportTicketMessagesRequestDto } from '@module/support/service-desk/dto/request/list-support-ticket-messages.request.dto';
import { ListSupportTicketsRequestDto } from '@module/support/service-desk/dto/request/list-support-tickets.request.dto';
import { GetSupportTicketDetailsResponseDto } from '@module/support/service-desk/dto/response/get-support-ticket-details.response.dto';
import { ListSupportTicketMessagesResponseDto } from '@module/support/service-desk/dto/response/list-support-ticket-messages.response.dto';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { ResolveSupportTicketResponseDto } from '@module/support/service-desk/dto/response/resolve-support-ticket.response.dto';
import { SupportTicketMessageItemResponseDto } from '@module/support/service-desk/dto/response/support-ticket-message-item.response.dto';
import { CreateSupportTicketMessageUseCase } from '@module/support/service-desk/use-case/create-support-ticket-message.use-case';
import { GetSupportTicketDetailsUseCase } from '@module/support/service-desk/use-case/get-support-ticket-details.use-case';
import { ListSupportTicketMessagesUseCase } from '@module/support/service-desk/use-case/list-support-ticket-messages.use-case';
import { ListSupportTicketsUseCase } from '@module/support/service-desk/use-case/list-support-tickets.use-case';
import { ResolveSupportTicketUseCase } from '@module/support/service-desk/use-case/resolve-support-ticket.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { SupportControllerRoute } from '@shared/api/util/decorator/class/controller-route/support-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@SupportControllerRoute('service-desk')
export class ServiceDeskController {
  protected readonly _type = ServiceDeskController.name;

  public constructor(
    private readonly listSupportTicketsUseCase: ListSupportTicketsUseCase,
    private readonly getSupportTicketDetailsUseCase: GetSupportTicketDetailsUseCase,
    private readonly listSupportTicketMessagesUseCase: ListSupportTicketMessagesUseCase,
    private readonly createSupportTicketMessageUseCase: CreateSupportTicketMessageUseCase,
    private readonly resolveSupportTicketUseCase: ResolveSupportTicketUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar tickets de suporte de forma paginada',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: 'tickets',
      method: RequestMethod.GET,
    },
    tag: ['support/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de tickets de suporte.',
      type: ListSupportTicketsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listSupportTickets(
    @GetSessionData() sessionData: SessionDataModel,
    @Query() dto: ListSupportTicketsRequestDto,
  ): Promise<ListSupportTicketsResponseDto> {
    return this.listSupportTicketsUseCase.execute(sessionData, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Buscar detalhes de um ticket de suporte por id',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: 'tickets/:supportTicketId',
      method: RequestMethod.GET,
    },
    tag: ['support/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Detalhes do ticket de suporte.',
      type: GetSupportTicketDetailsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getSupportTicketDetails(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailsResponseDto> {
    return this.getSupportTicketDetailsUseCase.execute(
      sessionData,
      supportTicketId,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar mensagens de um ticket de suporte de forma paginada',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: 'tickets/:supportTicketId/messages',
      method: RequestMethod.GET,
    },
    tag: ['support/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista paginada de mensagens do ticket de suporte.',
      type: ListSupportTicketMessagesResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listSupportTicketMessages(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
    @Query() dto: ListSupportTicketMessagesRequestDto,
  ): Promise<ListSupportTicketMessagesResponseDto> {
    return this.listSupportTicketMessagesUseCase.execute(
      sessionData,
      supportTicketId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Criar mensagem em um ticket de suporte',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: 'tickets/:supportTicketId/messages',
      method: RequestMethod.POST,
      type: CreateSupportTicketMessageRequestDto,
    },
    tag: ['support/service-desk'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Mensagem criada com sucesso.',
      type: SupportTicketMessageItemResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createSupportTicketMessage(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
    @Body() dto: CreateSupportTicketMessageRequestDto,
  ): Promise<SupportTicketMessageItemResponseDto> {
    return this.createSupportTicketMessageUseCase.execute(
      sessionData,
      supportTicketId,
      dto,
    );
  }

  @BuildEndpointSpecification({
    summary: 'Resolver ticket de suporte',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: 'tickets/:supportTicketId/resolve',
      method: RequestMethod.PATCH,
    },
    tag: ['support/service-desk'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Ticket de suporte resolvido com sucesso.',
      type: ResolveSupportTicketResponseDto,
    },
    guard: [AuthGuard],
  })
  public async resolveSupportTicket(
    @GetSessionData() sessionData: SessionDataModel,
    @Param('supportTicketId', new ParseValueObjectPipe(SupportTicketId))
    supportTicketId: SupportTicketId,
  ): Promise<ResolveSupportTicketResponseDto> {
    return this.resolveSupportTicketUseCase.execute(
      sessionData,
      supportTicketId,
    );
  }
}
