import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'email_template' })
export class EmailTemplateTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => OrganizationMemberTypeormEntity, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  public owner: OrganizationMemberTypeormEntity;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  public title: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  public description: string;

  @Column({ name: 'html_content', type: 'longtext' })
  public htmlContent: string;

  protected override readonly _type = EmailTemplateTypeormEntity.name;
}
