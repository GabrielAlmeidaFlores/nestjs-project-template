import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member-document/enum/bpc-disability-grant-family-member-document-type.enum';

@Entity({ name: 'bpc_disability_grant_family_member_document' })
export class BpcDisabilityGrantFamilyMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcDisabilityGrantFamilyMemberDocumentTypeEnum,
  })
  public type: BpcDisabilityGrantFamilyMemberDocumentTypeEnum;

  @ManyToOne(() => BpcDisabilityGrantFamilyMemberTypeormEntity)
  @JoinColumn({ name: '_bpc_disability_grant_family_member_id' })
  public BpcDisabilityGrantFamilyMember?:
    | BpcDisabilityGrantFamilyMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcDisabilityGrantFamilyMemberDocumentTypeormEntity.name;
}
