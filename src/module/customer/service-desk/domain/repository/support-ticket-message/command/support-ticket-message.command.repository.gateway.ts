import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SupportTicketMessageEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity';

export abstract class SupportTicketMessageCommandRepositoryGateway {
  public abstract createSupportTicketMessage(
    entity: SupportTicketMessageEntity,
  ): TransactionType;
}
