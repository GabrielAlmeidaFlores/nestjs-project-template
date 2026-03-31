import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';

@Entity({ name: 'support_ticket_attachment' })
export class SupportTicketAttachmentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bucket_key', type: 'varchar', length: 500 })
  public bucketKey: string;

  @Column({ name: 'original_file_name', type: 'varchar', length: 255 })
  public originalFileName: string;

  @ManyToOne(() => SupportTicketTypeormEntity, (entity) => entity.attachments)
  @JoinColumn({ name: 'support_ticket_id' })
  public supportTicket?: SupportTicketTypeormEntity;

  protected override readonly _type = SupportTicketAttachmentTypeormEntity.name;
}
