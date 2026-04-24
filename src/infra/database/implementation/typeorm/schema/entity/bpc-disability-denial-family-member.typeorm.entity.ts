import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member-document.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcDisabilityDenialFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-income-type.enum';
import { BpcDisabilityDenialFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-family-member/enum/bpc-disability-denial-family-member-kinship.enum';

@Entity({ name: 'bpc_disability_denial_family_member' })
export class BpcDisabilityDenialFamilyMemberTypeormEntity extends BaseTypeormEntity {
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
    enum: BpcDisabilityDenialFamilyMemberKinshipEnum,
  })
  public kinship: BpcDisabilityDenialFamilyMemberKinshipEnum;

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
    enum: BpcDisabilityDenialFamilyMemberIncomeTypeEnum,
    nullable: true,
  })
  public incomeType: BpcDisabilityDenialFamilyMemberIncomeTypeEnum | null;

  @Column({ name: 'has_expense_proofs', type: 'boolean', nullable: true })
  public hasExpenseProofs: boolean | null;

  @ManyToOne(() => BpcDisabilityDenialTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_denial_id' })
  public bpcDisabilityDenial?: BpcDisabilityDenialTypeormEntity | undefined;

  @OneToMany(
    () => BpcDisabilityDenialFamilyMemberDocumentTypeormEntity,
    (entity) => entity.bpcDisabilityDenialFamilyMember,
  )
  public bpcDisabilityDenialFamilyMemberDocument?:
    | BpcDisabilityDenialFamilyMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    BpcDisabilityDenialFamilyMemberTypeormEntity.name;
}
