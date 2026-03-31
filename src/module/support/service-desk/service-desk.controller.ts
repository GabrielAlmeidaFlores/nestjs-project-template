import { HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import { ListSupportTicketsRequestDto } from '@module/support/service-desk/dto/request/list-support-tickets.request.dto';
import { GetSupportTicketDetailsResponseDto } from '@module/support/service-desk/dto/response/get-support-ticket-details.response.dto';
import { ListSupportTicketsResponseDto } from '@module/support/service-desk/dto/response/list-support-tickets.response.dto';
import { GetSupportTicketDetailsUseCase } from '@module/support/service-desk/use-case/get-support-ticket-details.use-case';
import { ListSupportTicketsUseCase } from '@module/support/service-desk/use-case/list-support-tickets.use-case';
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
}
