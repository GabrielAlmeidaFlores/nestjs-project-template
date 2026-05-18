import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member-document/enum/bpc-elderly-analysis-family-member-document-type.enum';

@Entity({ name: 'bpc_elderly_analysis_family_member_document' })
export class BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum,
  })
  public type: BpcElderlyAnalysisFamilyMemberDocumentTypeEnum;

  @ManyToOne(() => BpcElderlyAnalysisFamilyMemberTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_analysis_family_member_id' })
  public bpcElderlyAnalysisFamilyMember?:
    | BpcElderlyAnalysisFamilyMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity.name;
}
