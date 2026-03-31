import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { TicketMessageSenderTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/enum/ticket-message-sender-type.enum';

@Entity({ name: 'support_ticket_message' })
export class SupportTicketMessageTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'sender_auth_identity_id', type: 'varchar', length: 36 })
  public senderAuthIdentityId: string;

  @Column({ name: 'sender_name', type: 'varchar', length: 255 })
  public senderName: string;

  @Column({ name: 'sender_type', type: 'varchar', length: 50 })
  public senderType: TicketMessageSenderTypeEnum;

  @Column({ name: 'content', type: 'longtext' })
  public content: string;

  @ManyToOne(() => SupportTicketTypeormEntity, (entity) => entity.messages)
  @JoinColumn({ name: 'support_ticket_id' })
  public supportTicket?: SupportTicketTypeormEntity;

  protected override readonly _type = SupportTicketMessageTypeormEntity.name;
}
