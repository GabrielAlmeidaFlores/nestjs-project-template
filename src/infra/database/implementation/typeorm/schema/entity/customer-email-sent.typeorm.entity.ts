import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'customer_email_sent' })
export class CustomerEmailSentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'emails', type: 'text' })
  public emails: string;

  @Column({ name: 'subject', type: 'varchar', length: 255 })
  public subject: string;

  @Column({ name: 'html_content', type: 'longtext' })
  public htmlContent: string;

  @Column({ name: 'is_simplified', type: 'boolean', default: false })
  public isSimplified: boolean;

  @ManyToOne(() => OrganizationMemberTypeormEntity, { nullable: true })
  @JoinColumn({ name: 'sent_by_id' })
  public sentBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = CustomerEmailSentTypeormEntity.name;
}
