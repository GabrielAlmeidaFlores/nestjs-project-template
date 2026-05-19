import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-family-member-document.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcElderlyAnalysisFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-income-type.enum';
import { BpcElderlyAnalysisFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-family-member/enum/bpc-elderly-analysis-family-member-kinship.enum';

@Entity({ name: 'bpc_elderly_analysis_family_member' })
export class BpcElderlyAnalysisFamilyMemberTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  public fullName: string;

  @Column({
    name: 'birth_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public birthDate: Date;

  @Column({
    name: 'kinship',
    type: 'simple-enum',
    enum: BpcElderlyAnalysisFamilyMemberKinshipEnum,
  })
  public kinship: BpcElderlyAnalysisFamilyMemberKinshipEnum;

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
    enum: BpcElderlyAnalysisFamilyMemberIncomeTypeEnum,
    nullable: true,
  })
  public incomeType: BpcElderlyAnalysisFamilyMemberIncomeTypeEnum | null;

  @ManyToOne(() => BpcElderlyAnalysisTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_analysis_id' })
  public bpcElderlyAnalysis?: BpcElderlyAnalysisTypeormEntity | undefined;

  @OneToMany(
    () => BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity,
    (entity) => entity.bpcElderlyAnalysisFamilyMember,
  )
  public bpcElderlyAnalysisFamilyMemberDocument?:
    | BpcElderlyAnalysisFamilyMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    BpcElderlyAnalysisFamilyMemberTypeormEntity.name;
}
