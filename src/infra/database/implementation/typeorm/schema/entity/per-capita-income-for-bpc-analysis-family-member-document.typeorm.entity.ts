import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member-document/enum/per-capita-income-for-bpc-analysis-family-member-document-type.enum';

@Entity({ name: 'per_capita_income_for_bpc_analysis_family_member_document' })
export class PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum,
  })
  public type: PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeEnum;

  @ManyToOne(() => PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity)
  @JoinColumn({ name: 'per_capita_income_for_bpc_analysis_family_member_id' })
  public perCapitaIncomeForBpcAnalysisFamilyMember?:
    | PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity
    | undefined;

  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity.name;
}
