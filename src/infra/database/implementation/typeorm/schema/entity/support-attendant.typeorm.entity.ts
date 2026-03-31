import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';

import type { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import type { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';

@Entity({ name: 'support_attendant' })
export class SupportAttendantTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  public email: string;

  @Column({ name: 'support_type', type: 'varchar', length: 50 })
  public supportType: SupportTypeEnum;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @OneToOne(
    'AuthIdentityTypeormEntity',
    (entity: { supportAttendant: SupportAttendantTypeormEntity }) =>
      entity.supportAttendant,
  )
  public authIdentity?: AuthIdentityTypeormEntity;

  @OneToMany(
    'SupportTicketTypeormEntity',
    (entity: { assignedAttendant: SupportAttendantTypeormEntity }) =>
      entity.assignedAttendant,
  )
  public assignedTickets?: SupportTicketTypeormEntity[];

  protected override readonly _type = SupportAttendantTypeormEntity.name;
}
