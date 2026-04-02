import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SupportTicketTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/support-ticket.typeorm.entity';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@Entity({ name: 'support_attendant' })
export class SupportAttendantTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  public email: string;

  @Column({
    name: 'support_type',
    type: 'enum',
    enum: SupportTypeEnum,
  })
  public supportType: SupportTypeEnum;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @OneToOne(
    () => AuthIdentityTypeormEntity,
    (entity) => entity.supportAttendant,
  )
  public authIdentity?: AuthIdentityTypeormEntity | undefined;

  @OneToMany(
    () => SupportTicketTypeormEntity,
    (entity) => entity.assignedAttendant,
  )
  public assignedTickets?: SupportTicketTypeormEntity[] | undefined;

  protected override readonly _type = SupportAttendantTypeormEntity.name;
}
