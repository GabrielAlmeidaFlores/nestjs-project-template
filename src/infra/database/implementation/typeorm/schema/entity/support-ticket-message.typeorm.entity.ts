import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';

@Entity({ name: 'support_ticket_message' })
export class SupportTicketMessageTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => SupportTicketTypeormEntity, (entity) => entity.messages, {
    nullable: false,
  })
  @JoinColumn({ name: 'support_ticket_id' })
  public supportTicket: SupportTicketTypeormEntity;

  @ManyToOne(() => AuthIdentityTypeormEntity, { nullable: false })
  @JoinColumn({ name: 'sender_auth_identity_id' })
  public senderAuthIdentity: AuthIdentityTypeormEntity;

  @Column({ name: 'sender_name', type: 'varchar', length: 255 })
  public senderName: string;

  @Column({ name: 'content', type: 'longtext' })
  public content: string;

  protected override readonly _type = SupportTicketMessageTypeormEntity.name;
}
