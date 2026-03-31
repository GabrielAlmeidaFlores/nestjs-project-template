import type { CreateSupportTicketMessageCommandParamType } from '@module/support/service-desk/domain/repository/support-ticket-message/command/type/input/create-support-ticket-message.command.param';
import type { GetSupportTicketMessageQueryResult } from '@module/support/service-desk/domain/repository/support-ticket-message/query/result/get-support-ticket-message.query.result';

export abstract class SupportTicketMessageCommandRepositoryGateway {
  public abstract create(
    param: CreateSupportTicketMessageCommandParamType,
  ): Promise<GetSupportTicketMessageQueryResult>;
}
