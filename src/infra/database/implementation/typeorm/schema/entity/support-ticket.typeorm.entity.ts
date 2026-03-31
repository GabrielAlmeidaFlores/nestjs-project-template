import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { SupportAttendantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-attendant.typeorm.entity';
import { SupportTicketAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-attachment.typeorm.entity';
import { SupportTicketMessageTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket-message.typeorm.entity';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@Entity({ name: 'support_ticket' })
@Index('UQ_support_ticket_org_number', ['organization', 'ticketNumber'], {
  unique: true,
})
export class SupportTicketTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => OrganizationTypeormEntity, { nullable: false })
  @JoinColumn({ name: 'organization_id' })
  public organization: OrganizationTypeormEntity;

  @ManyToOne(() => AuthIdentityTypeormEntity, { nullable: false })
  @JoinColumn({ name: 'requester_auth_identity_id' })
  public requesterAuthIdentity: AuthIdentityTypeormEntity;

  @Column({ name: 'requester_email', type: 'varchar', length: 255 })
  public requesterEmail: string;

  @Column({ name: 'requester_name', type: 'varchar', length: 255 })
  public requesterName: string;

  @Column({ name: 'ticket_number', type: 'varchar', length: 8 })
  public ticketNumber: string;

  @Column({
    name: 'support_type',
    type: 'enum',
    enum: SupportTypeEnum,
  })
  public supportType: SupportTypeEnum;

  @Column({ name: 'subject', type: 'varchar', length: 255 })
  public subject: string;

  @Column({ name: 'problem', type: 'varchar', length: 100 })
  public problem: string;

  @Column({ name: 'description', type: 'longtext' })
  public description: string;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  public status: string;

  @ManyToOne(
    () => SupportAttendantTypeormEntity,
    (entity) => entity.assignedTickets,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'assigned_attendant_id' })
  public assignedAttendant?: SupportAttendantTypeormEntity | undefined;

  @OneToMany(
    () => SupportTicketAttachmentTypeormEntity,
    (entity) => entity.supportTicket,
  )
  public attachments?: SupportTicketAttachmentTypeormEntity[] | undefined;

  @OneToMany(
    () => SupportTicketMessageTypeormEntity,
    (entity) => entity.supportTicket,
  )
  public messages?: SupportTicketMessageTypeormEntity[] | undefined;

  protected override readonly _type = SupportTicketTypeormEntity.name;
}
