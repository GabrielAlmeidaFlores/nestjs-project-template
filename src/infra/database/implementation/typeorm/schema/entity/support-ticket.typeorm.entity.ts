import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';

import type { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import type { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';

@Entity({ name: 'support_ticket' })
export class SupportTicketTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'organization_id', type: 'varchar', length: 36 })
  public organizationId: string;

  @Column({ name: 'requester_auth_identity_id', type: 'varchar', length: 36 })
  public requesterAuthIdentityId: string;

  @Column({ name: 'requester_email', type: 'varchar', length: 255 })
  public requesterEmail: string;

  @Column({ name: 'requester_name', type: 'varchar', length: 255 })
  public requesterName: string;

  @Column({ name: 'ticket_number', type: 'varchar', length: 8 })
  public ticketNumber: string;

  @Column({ name: 'support_type', type: 'varchar', length: 50 })
  public supportType: SupportTypeEnum;

  @Column({ name: 'subject', type: 'varchar', length: 255 })
  public subject: string;

  @Column({ name: 'problem', type: 'varchar', length: 100 })
  public problem: string;

  @Column({ name: 'description', type: 'longtext' })
  public description: string;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  public status: SupportTicketStatusEnum;

  @ManyToOne(
    () => SupportAttendantTypeormEntity,
    (entity) => entity.assignedTickets,
  )
  @JoinColumn({ name: 'assigned_attendant_id' })
  public assignedAttendant?: SupportAttendantTypeormEntity;

  @OneToMany(
    'SupportTicketAttachmentTypeormEntity',
    (entity: { ticket: SupportTicketTypeormEntity }) => entity.ticket,
  )
  public attachments?: SupportTicketAttachmentTypeormEntity[];

  @OneToMany(
    'SupportTicketMessageTypeormEntity',
    (entity: { ticket: SupportTicketTypeormEntity }) => entity.ticket,
  )
  public messages?: SupportTicketMessageTypeormEntity[];

  protected override readonly _type = SupportTicketTypeormEntity.name;
}
