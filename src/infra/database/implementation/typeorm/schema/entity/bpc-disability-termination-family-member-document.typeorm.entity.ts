import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member-document/enum/bpc-disability-termination-family-member-document-type.enum';

@Entity({ name: 'bpc_disability_termination_family_member_document' })
export class BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcDisabilityTerminationFamilyMemberDocumentTypeEnum,
  })
  public type: BpcDisabilityTerminationFamilyMemberDocumentTypeEnum;

  @ManyToOne(() => BpcDisabilityTerminationFamilyMemberTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_termination_family_member_id' })
  public bpcDisabilityTerminationFamilyMember?:
    | BpcDisabilityTerminationFamilyMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity.name;
}
