import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-income-type.enum';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-family-member/enum/per-capita-income-for-bpc-analysis-family-member-kinship.enum';

@Entity({ name: 'per_capita_income_for_bpc_analysis_family_member' })
export class PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  public fullName: string;

  @Column({
    name: 'birth_date',
    transformer: DateOnlyTransformer,
    type: 'date',
  })
  public birthDate: Date;

  @Column({
    name: 'kinship',
    type: 'simple-enum',
    enum: PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum,
  })
  public kinship: PerCapitaIncomeForBpcAnalysisFamilyMemberKinshipEnum;

  @Column({ name: 'lives_in_same_residence', type: 'boolean' })
  public livesInSameResidence: boolean;

  @Column({ name: 'has_income', type: 'boolean' })
  public hasIncome: boolean;

  @Column({
    name: 'monthly_income_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public monthlyIncomeAmount?: string | null;

  @Column({
    name: 'income_type',
    type: 'simple-enum',
    enum: PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum,
    nullable: true,
  })
  public incomeType: PerCapitaIncomeForBpcAnalysisFamilyMemberIncomeTypeEnum | null;

  @ManyToOne(() => PerCapitaIncomeForBpcAnalysisTypeormEntity)
  @JoinColumn({ name: 'per_capita_income_for_bpc_analysis_id' })
  public perCapitaIncomeForBpcAnalysis?:
    | PerCapitaIncomeForBpcAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysisFamilyMember,
  )
  public perCapitaIncomeForBpcAnalysisFamilyMemberDocument?:
    | PerCapitaIncomeForBpcAnalysisFamilyMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity.name;
}
