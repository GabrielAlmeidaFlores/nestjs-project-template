import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member-document/enum/bpc-disability-denial-family-member-document-type.enum';

@Entity({ name: 'bpc_disability_denial_family_member_document' })
export class BpcDisabilityDenialFamilyMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcDisabilityDenialFamilyMemberDocumentTypeEnum,
  })
  public type: BpcDisabilityDenialFamilyMemberDocumentTypeEnum;

  @ManyToOne(() => BpcDisabilityDenialFamilyMemberTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_denial_family_member_id' })
  public bpcDisabilityDenialFamilyMember?:
    | BpcDisabilityDenialFamilyMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcDisabilityDenialFamilyMemberDocumentTypeormEntity.name;
}
