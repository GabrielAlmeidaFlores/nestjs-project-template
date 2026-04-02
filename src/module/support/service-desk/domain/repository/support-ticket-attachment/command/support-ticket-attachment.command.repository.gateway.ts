import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SupportTicketAttachmentEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';

export abstract class SupportTicketAttachmentCommandRepositoryGateway {
  public abstract createManyTransaction(
    supportTicketAttachments: SupportTicketAttachmentEntity[],
  ): TransactionType;

  public abstract createMany(
    supportTicketAttachments: SupportTicketAttachmentEntity[],
  ): Promise<void>;
}
