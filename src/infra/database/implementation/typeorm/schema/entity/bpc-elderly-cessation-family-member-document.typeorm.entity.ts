import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { BpcElderlyCessationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member-document/enum/bpc-elderly-cessation-family-member-document-type.enum';

@Entity({ name: 'bpc_elderly_cessation_family_member_document' })
export class BpcElderlyCessationFamilyMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcElderlyCessationFamilyMemberDocumentTypeEnum,
  })
  public type: BpcElderlyCessationFamilyMemberDocumentTypeEnum;

  @ManyToOne(() => BpcElderlyCessationFamilyMemberTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_cessation_family_member_id' })
  public bpcElderlyCessationFamilyMember?:
    | BpcElderlyCessationFamilyMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcElderlyCessationFamilyMemberDocumentTypeormEntity.name;
}
